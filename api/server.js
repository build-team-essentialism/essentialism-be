const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const server = express()
require('dotenv').config()

server.use(express.json())
server.use(helmet())
server.use(cors({ origin: '*' }))

const auth = require('../middleware/authorize.js')

const authRouter = require('../auth/auth-router.js')
const users = require('../routes/users-router.js')
const prompts = require('../routes/prompts-router.js')
const pillars = require('../routes/pillars-router.js')

server.use('/api/auth', authRouter)
server.use('/api/users', auth, users)

server.use('/api/prompts', prompts)
server.use('/api/pillars', pillars)


server.get('/', (req, res) => {
    res.send('Hello! Clients!!!')
})

module.exports = server