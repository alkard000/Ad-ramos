const Usuarios = require( '../models/Usuarios' );

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
        res.redirect( '/inciar-sesion' );
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