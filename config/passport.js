const passport = require( 'passport' ) ;
const LocalStrategy = require( 'passport-local' ).Strategy;

//Referenciar modelo de autenticacion
const Usuarios = require( '../models/Usuarios' );
//Estrategia locales  de passport - Login con credenciales (usuario y pass)
passport.use(
    new LocalStrategy(
        //De manera default se espera un usuario de pass
        {
            usernameField : 'email',
            passwordField : 'password'
        },
        async (email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where : {
                        email
                    }
                });
                //El usuario coincide, pero el PW es incorrecto
                if(!usuario.verificarPassword(password)){
                    return done(null, false, {
                        message : 'El password en Incorrecto, intentalo de nuevo'
                    })
                }
                //Email coincide y el PW igual
                return done(null, usuario);
            } catch (error) {
                // SI el usuario no existe
                return done(null, false, {
                    message : 'Esa cuenta no Existe'
                })
            }
        }
    )
);

// Serilizar un usuario determinado
passport.serializeUser((usuario, callback) => {
    callback(null, usuario); 
});
// Deserializar un usuario determinado
passport.deserializeUser((usuario, callback) => {
    callback( null, usuario );
});
// Export
module.export = passport;