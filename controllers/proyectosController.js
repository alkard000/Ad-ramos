const Proyectos = require('../models/Poyectos');

exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();//controlador interactura con el modelo para pasarlo a la vista
    res.render('Index', {
        nombrePagina : 'Ramos ' + res.locals.year,
        proyectos
    });
}
exports.formularioRamo = async (req, res) => {
    const proyectos = await Proyectos.findAll();//controlador interactura con el modelo para pasarlo a la vista
    res.render('nuevoramo', {
        nombrePagina : 'Nuevo Ramo',
        proyectos
    });
}
exports.nuevoRamo = async(req, res) => {
    const proyectos = await Proyectos.findAll();//controlador interactura con el modelo para pasarlo a la vista
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
            errores,
            proyectos
        });
    } else {
        //Sin errores
        //Insertar en la BD
        //Usando await para el sync
        const proyecto = await Proyectos.create({ nombre });
        res.redirect('/');

    }
}
//Generando la pargina de cada proyecto
exports.proyectoPorUrl = async ( req, res, next ) => {
    const proyectos = await Proyectos.findAll();//controlador interactura con el modelo para pasarlo a la vista
    const proyecto = await Proyectos.findOne({
        where : {
            url : req.params.url
        }
    });

    if(!proyecto) return next();

    //Renderizacion de las tareas
    res.render( 'tareas', {
        nombrePagina : 'Tareas de la Asignatura',
        proyecto,
        proyectos
    })
    
}

exports.formularioEditar = async (req, res) => {
    const proyectos = await Proyectos.findAll();//controlador interactura con el modelo para pasarlo a la vista
    //renderizado al view
    res.render( 'nuevoramo', {
        nombrePagina : 'Editar Ramo',
        proyectos
    })
}