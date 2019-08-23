const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// refenriar modelo
const Usuarios = require('../models/Usuarios');

// Login con propiras credenciales
passport.use(
    new LocalStrategy(
        //de manera default se espera Usuario y PW
        {
            usernameField : 'email',
            passwordField : 'password'
        },
        //
        async (email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where : {
                        email,
                        activo : 1
                    }
                });
                //Usuario exite, pero el Pw es incorrecto
                if(!usuario.verificarPassword(password)){
                    return done(null, false, {
                        message : 'El PW es incorrecto'
                    })    
                }
                //Email y PW correcto
                return done(null, usuario);
            } catch (error) {
                // Usuario no Existe
                return done(null, false, {
                    message : 'Esa cuenta no Existe'
                })
            }
        }
    )
);
//SERIALIZAR
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});
//DESERIALIZAR
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

module.exports = passport;