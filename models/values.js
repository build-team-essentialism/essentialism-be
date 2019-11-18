const db = require('../data/dbConfig.js')

module.exports = {
    get,
    find,
    remove,
    update
}

async function get(){
    const values = await db('values')
    return values 
}

async function find(id){ //finds all values to a user id
    const userValues = await db('user_values').select({
        id: 'value_id',
        value: 'values.value'
    })
    .join('values', 'user_values.value_id', 'value.id')
    .orderBy('id', 'asc')
    .where({ user_id: id})

    return userValues
}

//don't think need all models for values since values will be predetermined for user to pick

async function findById(id){ //finds value with ID of id
    const value = await db('values').select({
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