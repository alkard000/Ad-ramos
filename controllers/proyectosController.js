const Proyectos = require('../models/Poyectos');

exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();//controlador interactura con el modelo para pasarlo a la vista
    res.render('Index', {
        nombrePagina : 'Ramos',
        proyectos
    });
}
exports.formularioRamo = (req, res) => {
    res.render('nuevoRamo', {
        nombrePagina : 'Nuevo Ramo'
    });
}
exports.nuevoRamo = async(req, res) => {
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
        //Usando await para el sync
        const proyecto = await Proyectos.create({ nombre });
        res.redirect('/');

    }
}