const express = require('express');
const router = express.Router();
//importar express validator
const { body } = require('express-validator/check');
//importar controlador
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

module.exports = function(){
    //rutas para el home
    router.get('/', 
        authController.usuarioAutenticado, 
        proyectosController.proyectosHome);
    router.get('/nuevo-ramo', 
        authController.usuarioAutenticado, 
        proyectosController.formularioRamo);
    router.post('/nuevo-ramo', 
        authController.usuarioAutenticado, 
        body('nombre').not().isEmpty().trim().escape(),       //SANITIZACION DEL FORMULARIO
        proyectosController.nuevoRamo
    );
    //listar ramos
    router.get( '/proyectos/:url',
        authController.usuarioAutenticado, 
        proyectosController.proyectoPorUrl 
    );
    //Update ramos
    router.get( '/proyecto/editar/:id', 
        authController.usuarioAutenticado, 
        proyectosController.formularioEditar );
    router.post('/nuevo-ramo/:id', 
        authController.usuarioAutenticado, 
        body('nombre').not().isEmpty().trim().escape(),       //SANITIZACION DEL FORMULARIO
        proyectosController.actualizarRamo
    );

    //Eliminar una asignatura
    router.delete('/proyectos/:url', 
        authController.usuarioAutenticado, 
        proyectosController.eliminarProyecto);

    //Tareas router
    router.post('/proyectos/:url', 
        authController.usuarioAutenticado, 
        tareasController.agregarTarea);

    //Upgrade Tarea
    router.patch('/tareas/:id', 
        authController.usuarioAutenticado, 
        tareasController.cambiarEstadoTarea);

    //Delete Tarea
    router.delete('/tareas/:id', 
        authController.usuarioAutenticado, 
        tareasController.eliminarTarea);

    //Crear Cuentas de Alumnos
    router.get('/crear-cuenta', 
        usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', 
        usuariosController.crearCuenta);

    // Ruta del inicio de sesion
    router.get('/iniciar-sesion', 
        usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', 
        authController.autenticarUsuario);

    //Cerrar la Sesion
    router.get('/cerrar-sesion', authController.cerrarSesion);

    return router;
}


