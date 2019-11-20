const router = require('express').Router()

const Users = require('../models/users.js')
const Prompts = require('../models/prompts.js')
const Pillars = require('../models/pillars.js')


router.get('/:id', (req,res) => {
    const { id } = req.params
    Users.userInfoById(id)
        .then(user => {
            res.status(200).json({ user })
        })
        .catch(error => {
            console.log('error in GET /api/users/:id', error)
            res.status(500).json({message: `error retrieving user`})
        })
})

router.get('/:id/prompts', async (req,res) => {
    const { id } = req.params

    try{
        const userPrompts = await Prompts.find(id)
        if(userPrompts){
            res.status(200).json(userPrompts)
        }
    }
    catch(error){
        res.status(500).json({message: `Prompts for this user could not be found: ${error}`})
    }

})

router.get('/:id/pillars', async (req,res) => {
    const { id } = req.params

    try{
        const userPillars = await Pillars.findUserPillars(id)

        if(userPillars){
            res.status(200).json(userPillars)
        }
    }
    catch(error){
        res.status(500).json({message: `Pillars for this user could not be found: ${error}`})
    }
})


router.delete('/:id', async (req,res) => {
    const { id } = req.params

    try{
        const deletedUser = await Users.remove(id)
        if(deletedUser){
            res.status(200).json(deletedUser)
        }
    }
    catch(error){
        res.status(500).json({message: `User could not be deleted, error: ${error}`})
    }
})

router.get('/:id/top', async (req,res) => { //userID
    const { id } = req.params
    try{
        const topPillars = await Users.topPillars(id)
        console.log("TOP PILLARS ROUTE", topPillars)
        if(topPillars){
            res.status(200).json(topPillars)
        }

    }
    catch(error){
        res.status(500).json({message: `User's top values could not be retrived, error: ${error}`})
    }
})


module.exports = router