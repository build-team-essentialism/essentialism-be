const router = require('express').Router()
const Prompts = require('../models/prompts.js')

router.post('/', async (req,res) => {
    try{
        req.body.forEach(async (prompt) => {
            await Prompts.create(prompt)
        })

        res.status(201).json({message: `New prompts were created!`})
        // const newPrompt = await Prompts.create(req.body)
        // if(newPrompt){
        //     res.status(201).json(newPrompt)
        // }
    }
    catch(error){
        res.status(500).json({ message: `Prompt post failed ${error}.` });
    }
})

router.put('/:id', async (req,res) => {
    const { id } = req.params
    const prompt = req.body

    try{
        const editedPrompt = await Prompts.update(prompt, id)
        if(editedPrompt){
            res.status(201).json(editedPrompt)
        }
        else{
            res.status(404).json({message: `This prompt does not exist`})
        }
    }
    catch(error){
        res.status(500).json({message: `This prompt could not be updated: ${error}`})
    }
})


router.delete('/:id', async (req,res) => {
    const { id } = req.params
    try{
        const deletedPrompt = await Prompts.remove(id)
        if(deletedPrompt){
            res.status(200).json(deletedPrompt)
        }

    }
    catch(error){
        res.status(500).json({message: `This prompt could not be deleted: ${error}`})
    }
})



module.exports = router