const db = require('../data/dbConfig.js')

module.exports = {
    get
}

async function get(){
    const values = await db('values')
    return values 
}

async function find(id){
    const userValues = await db('values').select({
        id: values.id,
        name: values.value
    })
}