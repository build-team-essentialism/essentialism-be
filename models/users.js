const db = require('../data/dbConfig.js')

module.exports = {
    find,
    findByUsername,
    create,
    remove,
    update,
    userInfoById,
    topPillars
}

async function find(id){
    const users = await db('users').where({id}).first
    return users
}

async function userInfoById(id){ 
    //selecting user with id of {id}
    const userQuery = await db('users').select({id: 'id', username: 'username'}).where({ id }).first()
    //select pillars for user_id
    const userPillars = await db('pillars').select({id: 'id', pillar: 'pillar', top:'top'}).where({ user_id: id })
     //select prompts for user_id
    const userPrompts = await db('prompts').select({id: 'id', prompt: 'prompt'}).where({ user_id: id })

    const retrieved = await Promise.all([userQuery, userPillars, userPrompts])
    // if(retrieved){
    //     return { ...retrieved[0], pillars: retrieved[1], prompts: retrieved[2] }
    // }

    if(retrieved){
        // console.log("RETRIEVED", retrieved)
        // console.log('RETRIEVED[0]', retrieved[0]) //{ username: 'Jane' }
        // console.log("RETRIEVED[1]", retrieved[1]) /* [
        //     { pillar: 'Balance' },
        //     { pillar: 'Family' },
        //     { pillar: 'Career Success' },
        //     { pillar: 'Hospitality' }
        //   ] */
        // console.log("RETRIEVED[2]", retrieved[2]) // [{ prompt: 'I value these values because they have been integrated into my upbringing'}, {prompt: "The projects I'm involved in are x, y, z"}]
        
        let information = retrieved[0]
        let pillars = retrieved[1]
        let prompts = retrieved[2]
        
        let agregatedInfo = {...information, pillars, prompts}
        // console.log('agregatedInfo', agregatedInfo)
        return agregatedInfo
    }
}


async function findByUsername(username){
    const user = await db('users').where({ username }).first()
    return user
}

async function create(newUser){
    const [id] = await db('users').insert(newUser).returning('id')
    if(id){
        const user = await userInfoById(id)
        return user
    }
}

async function remove(id){
    const user = await userInfoById(id)
    if(user){
        const deleted = await db('users').where({ id }).delete()
        if(deleted){
            return user //returns the deleted user.
        }
    }
}

async function update(updates, id){
    const editedUser = await db('users').where({ id }).update(updates)
    if(editedUser){
        const user = await userInfoById(id)
        return user
    }
}

// async function topPillars(id){
//     const top = await db('pillars').select({
//         id: 'id',
//         pillar: 'pillar',
//         top: 'top'
//     })
//     .where({ user_id: id }).andWhere({ 'top', 'true'})
// }

// async function topPillars(id){
//    var subquery = db('pillars').where('top', 'true').select('user_id')
//    const topThree = await db('pillars').where(id , 'in', subquery)
//    return topThree
//    /*{
//     "message": "User's top values could not be retrived, error: Error: select * from `pillars` where `13` in (select `user_id` from `pillars` where `top` = 'true') - SQLITE_ERROR: no such column: 13"
// } */
// }


// async function topPillars(id){
//     var subquery = db('pillars').where({top: true}).select('user_id')
//     const topThree = await db('pillars').where({user_id: id} , 'in', subquery)
//     return topThree
// }

//It's working (in developement at least)
async function topPillars(id){
    const truth = process.env.DB_ENV === 'production' ? 'true' : '1'
    const topThree = await db('pillars').select({
        id: 'id',
        pillar: 'pillar',
        top: 'top',
        user: 'user_id'
    })
    .where({user_id: id}).andWhere('top', truth)
    return topThree
}
