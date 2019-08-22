const passport = require('passport');

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