const db = require('../data/dbConfig.js')
const { findByUsername, create, remove, update, userInfoById, topPillars} = require('../models/users.js')
const server = require('../api/server.js')
const request = require('supertest')


jest.mock('../middleware/authorize.js', () => {
    return (req,res, next) => {
        next()
    }
})

beforeEach(async () => {
    await db('pillars').truncate()
    await db('users').truncate()

})

describe('Users model busines logic', () => {


    describe('create()', () => {
        it('it should add new User to database', async () => {
            const newUser = {
                username: 'Anthony',
                password: '12345'
            }
            const user = await create(newUser)
            
            const userTable = await db('users')
            console.log('USERTABLE', userTable)
            // expect(user.username).toBe('Mark')
            expect(user.id).toBeDefined()
            expect(userTable).toHaveLength(1)
        })
    })

    describe('remove()', () => {
        it('should remove user from database', async () => {
            const newUser =  {
                username: 'Mark',
                password: '12345'
            }

            await create(newUser)
            const removeUser = await remove(1)

            const userTable = await db('users')
            expect(userTable).toHaveLength(0)
        })
    })

    describe('update()', () => {
        it('should update user information', async () => {
            const newUser =  {
                username: 'Matt',
                password: '12345'
            }

            await create(newUser)

            const updates = {
                username: 'Matthew'
            }

            const updated = await update(updates, 1)

            const userTable = await db('users')

            const updatedUser = {
                username: 'Matthew'
            }

            expect(updated).toMatchObject(updatedUser)
        })
    })

    describe('findByUsername()', () => {
        it('should find find user given username as the search criteria', async () => {
            const newUser = {
                username: 'Lilly',
                password: '12345'
            }
            const user = await create(newUser)

            const found = await findByUsername('Lilly')

            expect(found).toMatchObject({username: 'Lilly'})
        })
    })


    describe('userInfoById()', () => {
        it('should get all user info by ID', async () => {
            const newUser = {
                username: 'Drew',
                password: '12345'
            }
            const user = await create(newUser)
            const createdObject = {
                username: 'Drew',
                pillars: [],
                prompts: [],
            }
            const retrieved = await userInfoById(1)

            expect(retrieved).toMatchObject(createdObject)

        })
    })

    describe('topPillars()', () => {
        it('should return user\'s top pillars', async () => {
            const newUser = {
                username: 'Vince',
                password: '12345'
            }

            const user = await create(newUser)
            expect(user.id).toBe(1)

            const pillars = [
                    {
                        "pillar": "Openess",
                        "top": true,
                        "user_id": 1
                    },
                    {
                        "pillar": "Transperancy",
                        "top": true,
                        "user_id": 1
                      
                    },
                    {
                        "pillar": "Travel",
                        "user_id": 1,
                        "top": true
                    }
            ]

            const returnedPillars = [
                { 
                    "id": 1,
                    "pillar": "Openess",
                    "top": 1,
                    "user": 1
                },
                {
                    "id": 2,
                    "pillar": "Transperancy",
                    "top": 1,
                    "user": 1
                  
                },
                {
                    "id": 3,
                    "pillar": "Travel",
                    "top": 1,
                    "user": 1
             
                }
        ]
            const response = await request(server).post('/api/pillars').send(pillars)
            expect(response.status).toBe(201)
            const top = await topPillars("1")
            // console.log("TOP", top)

            expect(top).toEqual(returnedPillars)

        })
    })


})