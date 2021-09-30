const { Router } = require('express');
const { Temperament } = require('../db');
const router = Router()


router.get('/', async (req, res) => {
  try {
    const result = await Temperament.findAll()
    res.json(result)
  } catch (error) {
    console.log(error)
  }
})




module.exports = router;