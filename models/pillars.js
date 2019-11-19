const db = require('../data/dbConfig.js')

module.exports = {
    get,
    find,
    remove,
    update,
    create
}

async function get(){
    const userPillars = await db('pillars')
    return userPillars 
}

async function find(id){ //finds all user Pillars to a user id
    const userPillars = await db('pillars').select({
        id: 'pillars.id',
        pillar: 'pillars.pillar',
        user: 'pillars.user_id' //might delete this later
    })
    // .orderBy('id', 'asc')
    .where({ 'pillars.user_id': id})

    return userPillars
}

//don't think need all models for pillars since pillars will be predetermined for user to pick

async function findById(id){ //finds value with ID of id, may not need it. 
    const value = await db('pillars').select({
        id: 'pillars.id',
        value: 'pillars.value'
    })
    .where({ 'pillars.id': id }).first()

    return value
}

async function create(newPillar){ 
    const [id] = await db('pillars').insert(newPillar).returning('id')
    if(id){
        const newInsert = await findById(id)
        return newInsert
    }
}

async function remove(id){
    const userPillar = await findById(id)
    if(userPillar){
        const removed = await db('pillars').where({ 'pillars.id': id }).delete()
        if(removed){
            return vauserPillarlue
        }
    }
}

async function update(newPillar, id){
    const newPillar =  await db('pillars').where({ 'pillars.id': id }).update(newValue)

    if(newPillar){
        const userPillar =  await findById(id)
        return userPillar
    }
}