exports.proyectosHome = (req, res) => {
    res.render('Index', {
        nombrePagina : 'Ramos'
    });
}
exports.formularioRamo = (req, res) => {
    res.render('nuevoRamo', {
        nombrePagina : 'Nuevo Ramo'
    });
}
exports.nuevoRamo = (req, res) => {
    res.send('Enviaste el Formulario')
}