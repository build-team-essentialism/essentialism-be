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

describe('user router', () => {
    beforeEach(async () => {
        await db('prompts').truncate()
        await db('pillars').truncate()
        await db('users').truncate()
    })
    describe('GET api/users/:id', () => {
        it('should return 200 if successful', async () => {
            const newUser = {
                username: 'Hailey',
                password: '12345'
            }

            await Users.create(newUser)
            const response = await request(server).get('/api/users/:id').send("1")
            expect(response.statusCode).toBe(200)
            // console.log("RESPONSE: ", response)
        })
    })

    describe('GET api/users/:id/prompts', () => {
        it('should return an array of the objects with prompts info. if successful', async () => {
            const newUser = {
                username: 'Hailey',
                password: '12345'
            }

            await Users.create(newUser)
            await Prompts.create({prompt: 'My first prompt...', user_id: 1})
            await Prompts.create({prompt: 'My second prompt...', user_id: 1})

            const prompts = await db('prompts')
            // expect(prompts.length).toBe(2)
            // console.log("PROMPTS", prompts)

            const bodywithPropts = [{id: 1, prompt: 'My first prompt...'}, {id: 2, prompt: 'My second prompt...'}]
            const response = await request(server).get('/api/users/1/prompts').send("1")
            expect(response.body).toEqual(bodywithPropts)
            // console.log("RESPONSE: ", response.body)
        })
    })
    describe('GET api/users/:id/pillars', () => {
        it('should return all pillars belonging to a user in JSON', async () => {
            const newUser = {
                username: 'Hailey',
                password: '12345'
            }
            await Users.create(newUser)
            await Pillars.create({pillar: 'My first prompt...', user_id: 1, top: 'true'})
            await Pillars.create({pillar: 'My second prompt...', user_id: 1, top: 'true'})

            const response = await request(server).get('/api/users/1/pillars').send('1')
            expect(response.body.length).toBe(2)
            expect(response.type).toBe('application/json')
        })
    })

    describe('DELETE api/users/:id', () => {
        it('should delete user with id of 2 with status 200', async () => {
            await Users.create({username: 'Anna', password: '12345'})
            await Users.create({username: 'Elizabeth', password: '12345'})

            const response = await request(server).delete('/api/users/2').send('2')
            expect(response.status).toBe(200)
        })
    })

    describe('GET api/users/:id/top', () => {
        it('should get user 1\'s top pillars only (i.e. "top": 1)', async () => {
            await Users.create({username: 'Anna', password: '12345'})
            await Pillars.create({pillar: 'My first prompt...', user_id: 1, top: '1'})
            await Pillars.create({pillar: 'My second prompt...', user_id: 1, top: '1'})
            // const p = await db('pillars')
            // expect(p.length).toBe(2)
            const response = await request(server).get('/api/users/1/top').send('1')
   
            // RES.BODY [
            //     { id: 1, pillar: 'My first prompt...', top: 1, user: 1 },
            //     { id: 2, pillar: 'My second prompt...', top: 1, user: 1 }
            //   ]
            // console.log('RES.TEXT', response.body)
            expect(response.body[0].top).toEqual(1)
            expect(response.body[1].top).toEqual(1)
        })
    })
})