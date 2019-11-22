const request = require('supertest')
const server = require('./server.js')
const db = require('../data/dbConfig.js')
jest.mock('../middleware/authorize.js', () => {
    return (req,res, next) => {
        next()
    }
})

const Users = require('../models/users.js')
const Prompts = require('../models/prompts.js')
const Pillars = require('../models/pillars.js')

beforeEach(async () => {
    await db('prompts').truncate()
    await db('pillars').truncate()
    await db('users').truncate()
})


describe('prompts router', () => {
    describe('POST /api/prompts', () => {
        it('should add a post with status code 201 and message: New prompts were created!', async () => {
            await Users.create({username: 'Anna', password: '12345'})

            const post = [{prompt: 'My first prompt...', user_id: 1},{prompt: 'My second prompt...', user_id: 1}]
            const response = await request(server).post('/api/prompts').send(post)
            expect(response.status).toBe(201)
            expect(response.body.message).toBe('New prompts were created!')
        })
    })

    describe('PUT /api/prompts/:id', () => {
        it('should update pillar and return status of 201', async () => {
            await Users.create({username: 'Anna', password: '12345'})

            const post = [{prompt: 'My first prompt...', user_id: 1},{prompt: 'My second prompt...', user_id: 1}]
            await request(server).post('/api/prompts').send(post)

            const put = {prompt: 'TEST'} 
            const response = await request(server).put('/api/prompts/1').send(put)
            expect(response.status).toBe(201)
        })
    })
    describe('DELETE /api/prompts/:id', () => {
        it('should delete pillar and return status of 200', async () => {
            await Users.create({username: 'Anna', password: '12345'})

            const post = [{prompt: 'My first prompt...', user_id: 1},{prompt: 'My second prompt...', user_id: 1}]
            await request(server).post('/api/prompts').send(post)

            const response = await request(server).delete('/api/prompts/1').send('1')
            expect(response.status).toBe(200)
        })
    })
})