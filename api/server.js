const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const server = express()
require('dotenv').config()

server.use(express.json())
server.use(helmet())
server.use(cors())

const auth = require('../middleware/authorize.js')
const users = require('../routes/users-router.js')
// const prompts = require('../routes/prompts-router.js')



const restrictedMiddleware = require('../middleware/authorize.js')

server.use('/api/auth', auth)
server.use('/api/users', users)
// server.use('/api/prompts', prompts)


server.get('/', (req, res) => {
    res.send('Hello! Clients!!!')
})

module.exports = server