const db = require('../data/dbConfig.js')
const Prompts = require('../models/prompts.js')
jest.mock('../middleware/authorize.js', () => {
    return (req,res, next) => {
        next()
    }
})
const Users = require('../models/users.js')

beforeEach(async () => {
    await db('pillars').truncate()
    await db('prompts').truncate()
    await db('users').truncate()
})

describe('Prompts model', () => {
    describe('create()', () => {
        it('should create a new prompt', async () => {
            const newUser = {
                username: 'Mark',
                password: '12345'
            }
           await Users.create(newUser)
           await Prompts.create({prompt: 'testing', user_id: 1})
           const promptsDB = await db('prompts')
           expect(promptsDB.length).toBe(1)
        })
    })
    describe('update()', () => {
        it('should update an existing prompt', async () => {
            const newUser = {
                username: 'Mark',
                password: '12345'
            }
           await Users.create(newUser)
           await Prompts.create({prompt: 'testing', user_id: 1})
           const promptUpdated = await Prompts.update({prompt: 'update!!!'}, 1)
        //    console.log('PROMPTU', promptUpdated)
           expect(promptUpdated[0].prompt).toEqual('update!!!')
        })
    })
})