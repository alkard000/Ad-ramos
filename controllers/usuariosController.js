const Usuarios = require( '../models/Usuarios' );

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina : 'Crear Cuenta AdBranch'
    })
}
exports.crearCuenta = (req, res) => {
    //Leer datos
    const { email, password } = req.body;
    //Crear Usuario
    Usuarios.create({
        email,
        password
    })

    .then(() => {
        res.redirect( '/inciar-sesion' );
    })
}