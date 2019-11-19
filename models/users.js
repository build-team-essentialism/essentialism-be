const db = require('../data/dbConfig.js')

module.exports = {
    find,
    findByUsername,
    create,
    remove,
    update,
    userInfoById
}

async function find(){
    const users = await db('users')
    return users
}

async function userInfoById(id){ 
    //selecting user with id of {id}
    const userQuery = await db('users').select('username').where({ id }).first()
    //select pillars for user_id
    const userPillars = await db('pillars').select('pillar').where({ user_id: id })
     //select prompts for user_id
    const userPrompts = await db('prompts').select('prompt').where({ user_id: id })

    const retrieved = await Promise.all([userQuery, userPillars, userPrompts])
    // if(retrieved){
    //     return { ...retrieved[0], pillars: retrieved[1], prompts: retrieved[2] }
    // }

    if(retrieved){
        console.log("RETRIEVED", retrieved)
        console.log('RETRIEVED[0]', retrieved[0]) //{ username: 'Jane' }
        console.log("RETRIEVED[1]", retrieved[1]) /* [
            { pillar: 'Balance' },
            { pillar: 'Family' },
            { pillar: 'Career Success' },
            { pillar: 'Hospitality' }
          ] */
        console.log("RETRIEVED[2]", retrieved[2]) // [{ prompt: 'I value these values because they have been integrated into my upbringing'}, {prompt: "The projects I'm involved in are x, y, z"}]
        
        let information = retrieved[0]
        let pillars = retrieved[1]
        let prompts = retrieved[2]
        
        let agregatedInfo = {...information, pillars, prompts}
        console.log('agregatedInfo', agregatedInfo)
        return agregatedInfo
    }
}


/* async function findById(id){
    const user = await db('users').select('username').where({ id }).first()
    return user
} */

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