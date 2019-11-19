const router = require('express').Router()

const Users = require('../models/users.js')
const Prompts = require('../models/prompts.js')
const Pillars = require('../models/pillars.js')


router.get('/:id', (req,res) => {
    const { id } = req.params
    Users.userInfoById(id)
        .then(user => {
            res.status(200).json(user)
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



module.exports = router