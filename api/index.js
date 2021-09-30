//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn , Temperament } = require('./src/db.js');
const axios = require('axios');
const e = require('express');
const {
  apyKey
} = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {

  const apiTemperamentResponse = await axios.get(`https://api.thedogapi.com/v1/breeds?${apyKey}`)
  let apiTemperament = apiTemperamentResponse.data;
  let result =[]
  let temperamentFilter = []

  apiTemperament.map(e => e.temperament).forEach(item => {
    temperamentFilter.push(item)
  })
  temperamentFilter = temperamentFilter.join("").split(" ")
  for(let i = 0; i < temperamentFilter.length; i++){
    if(!result.includes(temperamentFilter[i])){
      result.push(temperamentFilter[i])
    }
  } 
  result = result.sort().map(e => {
    return {
      name: e.slice(0 , -1)
    }
  })

  await Temperament.bulkCreate(result)


  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
