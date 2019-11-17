const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
require('dotenv').config()

server.use(express.json())
server.use(helmet())
server.use(cors())

const restricted = require('../middleware/authorize.js')
const users = require('../routes/users-router.js')
const projects = require('../routes/projects-router.js')
const top3 = require('../routes/top-three-router.js')

server.use('/api/auth', restricted)
server.use('/api/users', users)
server.use('/api/users/projects', projects)
server.use('/api/users/top', top3)

module.exports = server