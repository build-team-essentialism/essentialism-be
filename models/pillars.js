const db = require('../data/dbConfig.js')

module.exports = {
    get,
    find,
    remove,
    update
}

async function get(){
    const values = await db('pillars')
    return values 
}

async function find(id){ //finds all values to a user id
    const userValues = await db('pillars').select({
        id: 'pillars.id',
        pillar: 'pillars.pillar',
        user: 'pillars.user_id' //might delete this later
    })
    // .orderBy('id', 'asc')
    .where({ 'pillars.user_id': id})

    return userValues
}

//don't think need all models for pillars since pillars will be predetermined for user to pick

async function findById(id){ //finds value with ID of id, may not need it. 
    const value = await db('pillars').select({
        id: 'values.id',
        value: 'values.value'
    })
    .where({ id }).first()

    return value
}

async function remove(id){
    const value = await findById(id)
    if(value){
        const removed = await db('values').where({ id }).delete()
        if(removed){
            return value
        }
    }
}

async function update(newValue, id){
    const updatedValue =  await db('values').where({ id }).update(newValue)

    if(updatedValue){
        const value =  await findById(id)
        return value
    }
}