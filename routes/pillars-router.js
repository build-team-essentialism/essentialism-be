const router = require('express').Router()
const Pillars = require('../models/pillars.js')


router.post('/', async (req,res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ message: "Missing all data." });
    }
    try{
        req.body.forEach(async (pillar) => {
            await Pillars.create(pillar)
        })
        res.status(201).json({message: `New pillars were added!`})
        // const newPillar = await Pillars.create(req.body)

        // if(newPillar){
        //     res.status(201).json(newPillar)
        // }
    }
    catch(error){
        res.status(500).json({ message: `Pillar post failed ${error}.` });
    }

})

router.put('/:id', async (req,res) => {
    const { id } = req.params
    const pillar = req.body

    try{
        const editedPillar = await Pillars.update(pillar,id) 
        if(editedPillar){
            res.status(201).json(editedPillar)
        }
        else{
            res.status(404).json({message: `This pillar does not exist`})
        }
    }
    catch(error){
        res.status(500).json({message: `This pillar could not be updated: ${error}`})
    }
})


router.delete('/:id', async (req,res) => {
    const { id } = req.params
    try{
        const deletedPillar = await Pillars.remove(id)
        if(deletedPillar){
            res.status(200).json(deletedPillar)
        }
        else{
            res.status(404).json({message: `This pillar does not exist`})
        }

    }
    catch(error){
        res.status(500).json({message: `This pillar could not be deleted: ${error}`})
    }
})

module.exports = router