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
    //enviar a la consola
    // console.log(req.body);
    //validar algo en el formulario
    const { nombre } = req.body;

    let errores = [];

    if(!nombre){
        errores.push({
            'texto' : 'Agregar un Nombre Por Favor'
        })
    }
    //si hay errores
    if(errores.length > 0){
        res.render('nuevoramo', {
            nombrePagina : 'Nuevo Ramo',
            errores
        });
    } else {
        //Sin errores
        //Insertar en la BD
    }
}