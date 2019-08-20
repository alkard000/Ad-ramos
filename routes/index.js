const express = require('express');
const router = express.Router();
//importar express validator
const { body } = require('express-validator/check');
//importar controlador
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');

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

    //Tareas router
    router.post('/proyectos/:url', tareasController.agregarTarea);

    //Upgrade Tarea
    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);

    //Delete Tarea
    router.delete('/tareas/:id', tareasController.eliminarTarea);

    //Crear Cuentas de Alumnos
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);

    // Ruta del inicio de sesion
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion)

    return router;
}


