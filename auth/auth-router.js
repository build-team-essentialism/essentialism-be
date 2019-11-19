const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Users = require('../models/users.js')

router.post('/register', async (req, res) => {
    let { username, password } = req.body

    if (!username || !password) {
        res.status(401).json({ message: "Please enter a username and password" });
    } 
    else{
        password = bcrypt.hashSync(password, 10)
        try{
            const userAdded = await Users.create({username , password})
            if(userAdded){
                const token = generateToken(userAdded.id, username)
                res.status(201).json({message: `Hello, ${username}!`, token, userId: userAdded.id})
            }
        }
        catch(error){ 
            console.log(error)
            res.status(500).json({message: `Error registering new user: ${error}`})
        }
    }
})

router.post('/login', async (req,res) => {
    let { username, password } = req.body;

    if (!username || !password) {
        res.status(401).json({ message: "Please provide valid credentials" });
    }
    else{
        try{
            const user = await Users.findByUsername(username)
            if(user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user.id, username)
                res.status(200).json({message: `Successful login, ${username}!`, token, userId: user.id})
            }
            else {
                res.status(401).json({ message: `Invalid credentials, please try again` });
            }
        }
        catch(error){
            res.status(500).json({message: `Error logging in: ${error}`})
        }
    }
})

function generateToken(id, username){
    const payload = {
        id,
        username
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, process.env.JWT_SECRET, options)
}


module.exports = router