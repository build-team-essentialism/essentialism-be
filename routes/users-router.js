const router = require('express').Router()
// const Pillars = require('../models/pillars.js')
const Users = require('../models/users.js')

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

module.exports = router