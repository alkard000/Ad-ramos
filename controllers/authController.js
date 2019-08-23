const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');

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

    console.log(resetURL);
}

exports.actualizarPassword = async (req, res) => {
    res.json(req.params.token);
}