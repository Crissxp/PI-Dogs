const { Router } = require('express');
const { v4: uuidv4 } = require("uuid")
const { Dog, Temperament } = require('../db')
const router = Router()




router.post('/',  async (req, res) => {
   const { name, height, weight, life_span, temperament } = req.body
try {
  let newDog = await Dog.create({
    id: uuidv4(),
    name,
    height,
    weight,
    life_span,
   })
   
   let idDog= newDog.id
   let dog = await Dog.findByPk(idDog)
   let apiTemp = await dog.addTemperaments(temperament)
   
  
   res.json([newDog, apiTemp])

} catch (error) {
  console.log(error)
}
   
})


module.exports = router;