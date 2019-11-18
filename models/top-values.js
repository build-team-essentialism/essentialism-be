const db = require('../data/dbConfig.js')

module.exports = {
    find,
    findById,
    remove,
    update
}

async function find(id){
    const userTopValues = await db('top_values').select({
        id: 'top_values.id',
        value: 'values.name',
        username: 'users.username'
    })
    .join('users', 'top_values.user_id', 'users.id')
    .orderBy('id', 'asc')
    .where({ user_id: id})

    return userTopValues
}

async function findById(id){
    const topValues = await db('top_values').select({
        id: 'top_values.id',
        value: 'values.name',
        username: 'users.username'
    })
    .join('users', 'top_values.user_id', 'users.id')
    .where({ id }).first()
    return topValues
}


async function remove(id){
    const topValue = await findById(id)
    if(topValue){
        const removed = await db('top_values').where({ id }).delete()
        if(removed){
            return topValue
        }
    }
}

async function update(newTopValue, id){
    const updatedValue =  await db('top_values').where({ id }).update(newTopValue)

    if(updatedValue){
        const topValue =  await findById(id)
        return topValue
    }
}
