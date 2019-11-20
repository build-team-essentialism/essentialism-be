const db = require('../data/dbConfig.js')

module.exports = {
    get,
    findUserPillars,
    findById,
    remove,
    update,
    create
}

async function get(){
    const userPillars = await db('pillars')
    return userPillars 
}

async function findUserPillars(id){ //finds all user Pillars to a user id
    const userPillars = await db('pillars').select({
        id: 'id',
        pillar: 'pillar',
        // user: 'user_id' //might delete this later
    })
    // .orderBy('id', 'asc')
    .where({ user_id: id })

    return userPillars
}

//don't think need all models for pillars since pillars will be predetermined for user to pick

async function findById(id){ 
    const value = await db('pillars').select({
        id: 'id',
        pillar: 'pillar'
    })
    .where({ id }).first()

    return value
}

async function create(newPillar){ 

    /* knex did not like the forEach here

    newPillarsArrray.forEach(async (pillar) => {
        const[id] = await db('pillars').insert(pillar).returning('id')
        if(id){
            const newPillar = await findById(id)
            return newPillar
        }
    })
    */

    const [id] = await db('pillars').insert(newPillar).returning('id')
    return id

    /*will not be returning new insert
    // if(id){
    //     const newInsert = await findById(id)
    //     return newInsert
    // }
    */
}

async function remove(id){
    const userPillar = await findById(id)
    if(userPillar){
        const removed = await db('pillars').where({ id }).delete()
        if(removed){
            return userPillar
        }
    }
}

async function update(newPillar, id){
    const updatedPillar =  await db('pillars').where({ id }).update(newPillar)

    if(updatedPillar){
        const userPillar =  await findById(id)
        return userPillar
    }
}