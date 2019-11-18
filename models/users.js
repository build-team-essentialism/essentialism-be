const db = require('../data/dbConfig.js')

module.exports = {
    find,
    findById,
    findByUsername,
    create,
    remove,
    update
}

async function find(){
    const users = await db('users')
    return users
}

async function findById(id){
    const user = await db('users').select('username').where({ id }).first()
    return user
}

async function findByUsername(username){
    const user = await db('users').where({ username }).first()
    return user
}

async function create(newUser){
    const [id] = await db('users').insert(newUser).returning('id')
    if(id){
        const user = await findById(id)
        return user
    }
}

async function remove(id){
    const user = await findById(id)
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
        const user = await findById(id)
        return user
    }
}