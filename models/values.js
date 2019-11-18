const db = require('../data/dbConfig.js')

module.exports = {
    get
}

async function get(){
    const values = await db('values')
    return values 
}

