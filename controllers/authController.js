const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const crypto = require('crypto');
const bcrypt = require( 'bcrypt-nodejs' );
const enviarEmail = require('../handler/email');


exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect : '/',
    failureRedirect : '/iniciar-sesion',
    failureFlash : true,
    badRequestMessage : 'Ambos campos son Obligatorios'
});

//Revisar si el Uusario esta logeado
exports.usuarioAutenticado = (req, res, next) => {
    // Si el ususario esta autenticado
    if(req.isAuthenticated()){
        return next();
    }
    //Si el usuario no esta autenticas
    return res.redirect('/iniciar-sesion');
}

//Funcion para cerrar la Seison
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion');//Nos lleva al login
    })
}

//Generar un TOKEN unico si el ususario es valido
exports.enviarToken = async (req, res) => {
    // Verificar si el Usuario Existe
    const { email } = req.body
    const usuario = await Usuarios.findOne({
        where : {
            email 
        }
    });
    //Si no existe el Usuario
    if(!usuario){
        req.flash('error', 'No existe esa cuenta');
        res.redirect('/restablecer');
    }

    //Si existe el Usuario

    //Token
    usuario.token = crypto.randomBytes(20).toString('hex');
    //Expiracion
    usuario.expiracion = Date.now() + 3600000;

    //Guardarlos en la BD

    await usuario.save();

    //URL reset
    const resetURL = `http://${req.headers.host}/restablecer/${usuario.token}`;

    //Enviar el correo con el TOKEN
    await enviarEmail.enviar({
        usuario,
        subject : 'Password Reset',
        resetURL,
        archivo : 'restablecerpassword'
    });
    //Terminar redireccionando
    req.flash('correcto', 'Se ha enviado un Correo de Verificacion a tu Email')
    res.redirect('/iniciar-sesion')
}

exports.validarToken = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where : {
            token : req.params.token
        }
    });
    //Si no se encuentra el usuario
    if(!usuario) {
        req.flash('error', 'No Valido');
        res.redirect('/restablecer');
    }
    //Formulario para cambiar el PW
    res.render('actualizarpassword', {
        nombrePagina : 'Restablecer Contraseña'
    })
}

//Restablecer Password
exports.actualizarPassword = async (req, res) => {
    //Verificar el TOKEN y la Expiracion
    const usuario = await Usuarios.findOne({
        where : {
            token : req.params.token,
            expiracion : {
                [Op.gte] : Date.now()
            }
        }
    });
    //Verificamos si el Uusario Existe
    if(!usuario) {
        req.flash('error', 'No Valido');
        res.redirect('/restablecer');
    }
    //HASHEAR nuevo password
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)); // -------->> HASHEO DE PASSWORD en 10
    usuario.token = null;
    usuario.expiracion = null;
    //Guardar nuevo PW
    await usuario.save();
    req.flash('correcto', 'Tu password ah sido modificado');
    res.redirect('/iniciar-sesion');
}