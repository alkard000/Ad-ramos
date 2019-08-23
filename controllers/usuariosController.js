const Usuarios = require( '../models/Usuarios' );
const enviarEmail = require('../handler/email');

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina : 'Crear Cuenta AdBranch'
    })
}
exports.formIniciarSesion = (req, res) => {
    const { error } = res.locals.mensajes;
    res.render('iniciarsesion', {
        nombrePagina : 'Iniciar Sesión en AdBranch',
        error
    })
}
exports.crearCuenta = async (req, res) => {
    //Leer datos
    const { email, password } = req.body;

    try {
        //Crear 
        await Usuarios.create({
            email,
            password
        });
        //Crear URL de confirmacion
        const confirmarURL = `http://${req.headers.host}/confirmar/${email}`;
        //Crear Objeto de usuario
        const usuario = {
            email
        }
        //enviar email
        req.flash('correcto', 'Te enviamos un correo, confirma tu cuenta');
        res.redirect('/iniciar-sesion');
        await enviarEmail.enviar({
            usuario,
            subject : 'Confirma tu cuenta AdBranch',
            confirmarURL,
            archivo : 'confirmarcuenta'
        });        
        //Redirigir al Usuario
        res.redirect( '/iniciar-sesion' );
    } catch (error) {
        req.flash( 'error', error.errors.map( error => error.message ) );
        res.render('crearcuenta', {
            mensajes : req.flash(),
            nombrePagina : 'Crear Cuenta AdBranch',
            email,
            password
        })
    }
}
exports.formRestablecerPassword = (req, res) =>{
    res.render('restablecer', {
        nombrePagina : 'Restablece tu Contraseña'
    })
}
//Cambia el estado de una cuenta en funcion de un BOOLEANO
exports.confirmarCuenta = async (req, res) => {
    const usuario =await Usuarios.findOne({
        where : {
            email : req.params.correo
        }
    });
    //Si es que existe el usario
    if(!usuario){
        req.flash('error', 'No Valido');
        res.redirect('/crear-cuenta');
    }
    usuario.activo = 1;
    await usuario.save();

    req.flash('correcto', 'Tu Cuenta ha sido Activada Correctamente');
    res.redirect('/iniciar-sesion');
}