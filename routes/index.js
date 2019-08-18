const express = require('express');
const router = express.Router();
//importar express validator
const { body } = require('express-validator/check');
//importar controlador
const proyectosController = require('../controllers/proyectosController');
module.exports = function(){
    //rutas para el home
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-ramo', proyectosController.formularioRamo)
    router.post('/nuevo-ramo', 
        body('nombre').not().isEmpty().trim().escape(),       //SANITIZACION DEL FORMULARIO
        proyectosController.nuevoRamo
    );
    //listar ramos
    router.get( '/proyectos/:url', proyectosController.proyectoPorUrl );
    //Update ramos
    router.get( '/proyecto/editar/:id', proyectosController.formularioEditar );
    router.post('/nuevo-ramo/:id', 
    body('nombre').not().isEmpty().trim().escape(),       //SANITIZACION DEL FORMULARIO
    proyectosController.actualizarRamo
    );

    //Eliminar una asignatura
    router.delete('/proyectos/:url', proyectosController.eliminarProyecto);

    return router;
}


