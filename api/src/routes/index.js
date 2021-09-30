const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRoutes = require('./dogs.js');
const dogRoutes = require('./dog.js');
const temperamensRoutes = require('./temperaments.js');


const router =  Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogsRoutes);
router.use('/dog', dogRoutes);
router.use('/temperaments', temperamensRoutes);

module.exports = router;
