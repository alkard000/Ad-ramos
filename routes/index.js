const express = require('express');
const router = express.Router();
//importar controlador
const proyectosController = require('../controllers/proyectosController');
module.exports = function(){
    //rutas para el home
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-ramo', proyectosController.formularioRamo)
    router.post('/nuevo-ramo', proyectosController.nuevoRamo)
    return router;
}


