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

    describe('remove()', () => {
        it('should update an existing prompt', async () => {
            const newUser = {
                username: 'Mark',
                password: '12345'
            }
           await Users.create(newUser)
           await Prompts.create({prompt: 'testing', user_id: 1})
           await Prompts.remove(1)
           const PromptsDB = await db('prompts')
           expect(PromptsDB.length).toEqual(0)
        })
    })

    describe('findById()', () => {
        it('should return prompt with id of 1', async () => {
            const newUser = {
                username: 'Mark',
                password: '12345'
            }
           await Users.create(newUser)
           await Prompts.create({prompt: 'testing', user_id: 1})

           const foundPrompt = await Prompts.findById(1)
           expect(foundPrompt[0].id).toEqual(1)
        })
    })

    describe('find()', () => {
        it('should return all prompts associated with user id 1', async () => {
            const newUser = {
                username: 'Hailey',
                password: '12345'
            }

            await Users.create(newUser)
            
            const prompt1 = {
                "prompt": "....my prompt 1",
                "user_id": 1
            }
            await Prompts.create(prompt1)
            const prompt2 = {
                "prompt": "....my prompt 2",
                "user_id": 1
            }
            await Prompts.create(prompt2)
            
            const userPrompts = await Prompts.find(1)

            expect(userPrompts.length).toBe(2)
        })
    })
})




