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
})