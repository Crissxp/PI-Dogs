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
const temperaments = require('./src/models/temperaments.js');
const {
  apyKey
} = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  try {
    const apiTemperamentResponse = await axios.get(`https://api.thedogapi.com/v1/breeds?${apyKey}`)
    let temp = []
    let result = []
    apiTemperamentResponse.data.map((e,i) => {
      if(e.temperament){
        temp.push(e.temperament.split(","))
      } 
    })
    for(let i = 0 ; i < temp.length; i++){
      for(let j = 0 ; j < temp.length;j++)
      if(temp[i][j] && !result.join("").match(temp[i][j].trim())){
        result.push(temp[i][j].trim())
      }  
    }
    result = result.sort().map(e => {
      return {
        name: e
      }
    })
      
    
    await Temperament.bulkCreate(result)
  } catch (error) {
    console.log(error)
  }
  


  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
