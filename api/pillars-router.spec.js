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

describe('pillars router', () => {
    beforeEach(async () => {
        await db('prompts').truncate()
        await db('pillars').truncate()
        await db('users').truncate()
    })
    describe('POST /api/pillars', () => {
        it("should post a new pillar and return message: 'New pillars were added!'", async () => {
            await Users.create({username: 'Anna', password: '12345'})

            const post = [{pillar: 'My first prompt...', user_id: 1, top: '1'},{pillar: 'My second prompt...', user_id: 1, top: '1'}]
            const response = await request(server).post('/api/pillars').send(post)
            expect(response.status).toBe(201)
            expect(response.body.message).toEqual('New pillars were added!')
        })
    })
    describe('PUT /api/pillars/:id', () => {
        it('should update pillar and return status of 201', async () => {
            await Users.create({username: 'Anna', password: '12345'})

            const post = [{pillar: 'My first prompt...', user_id: 1, top: '1'},{pillar: 'My second prompt...', user_id: 1, top: '1'}]
            await request(server).post('/api/pillars').send(post)

            const put = {top: '0'}
            const response = await request(server).put('/api/pillars/1').send(put)
            expect(response.status).toBe(201)
        })
    })
    describe('DELETE /api/pillars/:id', () => {
        it('should delete pillar and return status of 200', async () => {
            await Users.create({username: 'Anna', password: '12345'})

            const post = [{pillar: 'My first prompt...', user_id: 1, top: '1'},{pillar: 'My second prompt...', user_id: 1, top: '1'}]
            await request(server).post('/api/pillars').send(post)

            const response = await request(server).delete('/api/pillars/1').send('1')
            expect(response.status).toBe(200)
        })
    })
})