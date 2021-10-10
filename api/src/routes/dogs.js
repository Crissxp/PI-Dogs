require('dotenv').config();
const { Router } = require('express');
const { Dog, Temperament} = require('../db');
const { Op } = require("sequelize") 
const  axios  = require("axios");
const { apiKey } = process.env;




const router = Router()


router.get('/',  async (req, res) => {
  const apiResult = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`)
  const dbResult = await Dog.findAll({
    include: Temperament
  })

try {

  if(!req.query.name){
  let apiDogs =  apiResult.data
  let dbDogs =  dbResult

  apiDogs = apiDogs.map(d => {
    return {
      id: d.id,
      image: d.image.url,
      name: d.name,
      temperament: d.temperament,
      weight: d.weight.metric
    }
  })
  dbDogs = dbDogs.map(d => {
    let result = []
    d.Temperaments.forEach(e => {
      result.push(e.name)
    })
    return {
      id: d.id,
      image:d.image,
      name: d.name,
      temperament: result.join(" "),
      weight: d.weight
    }
  })
  let allDogs = apiDogs.concat(dbDogs)
 
    res.json(allDogs)
  
  
  }else {
    const { name } = req.query
    let apiNameDog = apiResult.data
    let dbNameResult = await Dog.findAll({
      include: Temperament,
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        }
      }
    });

    dbNameResult= dbNameResult.map(d => {
      let result = []
    d.Temperaments.forEach(e => {
      result.push(e.name)
    })
  
    return {
      id: d.id,
      image: d.image,
      name: d.name,
      temperament: result.join(" "),
      weight: d.weight
    }
    })
    apiNameDog = apiNameDog.filter(e => e.name.toLowerCase().includes(name.toLowerCase())).map(n => {
      return {
        id: n.id,
        image: n.image.url,
        name: n.name,
        temperament: n.temperament,
        weight: n.weight.metric
      }
  })
    let allNameDogs = apiNameDog.concat(dbNameResult)

  
    
    allNameDogs.length > 0 ? res.json(allNameDogs) : res.status(400).send("Sin resultados");

  }
  }catch(error) {

    console.log(error)
  }

})
  

 router.get('/:id',  async (req, res) => {
  const {id} = req.params 
  try {
    if(id.length > 10){
      const dbResult = await Dog.findByPk(id, {include: [Temperament]})
      let dbFilter = []

      if(dbResult){
        let result = []
        dbFilter.push(dbResult.dataValues)
        dbFilter = dbFilter.map(e =>  {
          e.Temperaments.forEach(e => {
          result.push(e.name)
      })
        return {
            id: e.id,
            image: e.image,
            name: e.name,
            temperament: result.join(" "),
            weight: e.weight,
            height: e.height,
            life_span: e.life_span
        }
        })
      }
      
      dbResult ? res.send(dbFilter[0]) : res.status(400).send("sin resultado")


    }else {
    const apiSeach = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`)
    let apiResult = apiSeach.data.filter(e => e.id == id).map(d => {
      return {
        id: d.id,
        image: d.image.url,
        name: d.name,
        temperament: d.temperament,
        weight: d.weight.metric,
        height: d.height.metric,
        life_span: d.life_span
      }
    })
    
    apiResult.length !== 0 ? res.json(apiResult[0]) : res.status(400).send("sin resultados")

    }

  } catch (error) {
    console.log(error)
  }


 })

module.exports = router;