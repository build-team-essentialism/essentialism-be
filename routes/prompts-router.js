const router = require('express').Router()
const Prompts = require('../models/prompts.js')



router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const review = await db.findById(id);
      if (review) {
        res.status(200).json(review);
      } else {
        res
          .status(404)
          .json({ message: "Review with specified ID does not exist." });
      }
    } catch (error) {
      res.status(500).json({ message: `Review request failed ${error}.` });
    }
  });
module.exports = router