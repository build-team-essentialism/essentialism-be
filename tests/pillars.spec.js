const db = require('../data/dbConfig.js')
const Users = require('../models/users.js')
const Pillars = require('../models/pillars.js')

jest.mock('../middleware/authorize.js', () => {
    return (req,res, next) => {
        next()
    }
})    

beforeEach(async () => {
    await db('pillars').truncate()
    await db('users').truncate()
})
describe('pillars model business logic', () => {


    describe('create()', () => {
        
        it('creates a pillar and returns pillar id', async () => {
            const newUser = {
                username: 'Mark',
                password: '12345'
            }
            const user = await Users.create(newUser)
            console.log('PILLAR USER', user)
            expect(user.id).toBe(1)

            const pillar = {
                            "pillar": "Openess",
                            "top": true,
                            "user_id": 1
                            }
        
            const response = await Pillars.create(pillar)

            expect(response).toBe(1)
        })
        
    })

    describe('remove()', () => {
        it('should remove a pillar and pillars table should be empty', async() => {
            const newUser = {
                username: 'Mark',
                password: '12345'
            }
           await Users.create(newUser)

            const pillar = {
                            "pillar": "Openess",
                            "top": true,
                            "user_id": 1
                            }
        
            await Pillars.create(pillar)
            await Pillars.remove(1)

            const pillarsTable = await db('pillars')
            expect(pillarsTable.length).toBe(0)
        })
    })
    describe('update()', () => {
        it("should update pillar field 'top' to false", async () => {
            const newUser = {
                username: 'Mark',
                password: '12345'
            }
           await Users.create(newUser)

            const pillar = {
                            "pillar": "Openess",
                            "top": true,
                            "user_id": 1
                            }
        
            await Pillars.create(pillar)

            const updatedPillar = await Pillars.update({"top": false}, 1)

            expect(updatedPillar.top).toBe(0)
        })
    })

    describe('findById()', () => {
        it('should find pillar with id of 1', async () => {
            const newUser = {
                username: 'Mark',
                password: '12345'
            }
           await Users.create(newUser)

            const pillar = {
                            "pillar": "Openess",
                            "top": true,
                            "user_id": 1
                            }
        
            await Pillars.create(pillar)

            const searchedPillar = await Pillars.findById(1)
            expect(searchedPillar.id).toEqual(1)
            
        })
    })

    describe('findUserPillars()', () => {
        it('should find all pillars associated with user id 1' , async () => {
            const newUser = {
                username: 'Mark',
                password: '12345'
            }
           await Users.create(newUser)

            const pillar1 = {
                            "pillar": "Openess",
                            "top": true,
                            "user_id": 1
            }
            await Pillars.create(pillar1)
            const pillar2 = {
                "pillar": "Openess",
                "top": true,
                "user_id": 1
            }
            await Pillars.create(pillar2)

            const userPillars = await Pillars.findUserPillars(1)
            expect(userPillars.length).toBe(2)
            // console.log('USER PILLS', userPillars)
        })
    })
})