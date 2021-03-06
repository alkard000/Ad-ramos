const Proyectos = require('../models/Poyectos');
const Tareas = require('../models/Tareas');

exports.proyectosHome = async (req, res) => {
    //console.log(res.locals.usuario);
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({
        where : {
            usuarioId
        }
    });//controlador interactura con el modelo para pasarlo a la vista
    res.render('Index', {
        nombrePagina : 'Ramos ' + res.locals.year,
        proyectos
    });
}
exports.formularioRamo = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({
        where : {
            usuarioId
        }
    });//controlador interactura con el modelo para pasarlo a la vista
    res.render('nuevoramo', {
        nombrePagina : 'Nuevo Ramo',
        proyectos
    });
}
exports.nuevoRamo = async(req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({
        where : {
            usuarioId
        }
    });//controlador interactura con el modelo para pasarlo a la vista
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
        const usuarioId = res.locals.usuario.id;
        await Proyectos.create({ nombre, usuarioId });
        res.redirect('/');

    }
}
//Generando la pargina de cada proyecto
exports.proyectoPorUrl = async ( req, res, next ) => {
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({
        where : {
            usuarioId
        }
    });//controlador interactura con el modelo para pasarlo a la vista
    const proyectoPromise =  Proyectos.findOne({
        where : {
            url : req.params.url,
            usuarioId
        }
    });

    const [proyectos, proyecto] = await Promise.all([ proyectosPromise, proyectoPromise ]);
    //consultar tareas del proyecto actual
    const tareas = await Tareas.findAll({
        where : {
            proyectoId : proyecto.id
        }
        //include : [
        //    {
        //       model : Proyectos
        //   }
        //]
    });

    if(!proyecto) return next();

    //Renderizacion de las tareas
    res.render( 'tareas', {
        nombrePagina : 'Tareas de la Asignatura',
        proyecto,
        proyectos,
        tareas
    })
    
}

exports.formularioEditar = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({
        where : {
            usuarioId
        }
    });//controlador interactura con el modelo para pasarlo a la vista
    const proyectoPromise =  Proyectos.findOne({
        where : {
            id : req.params.id,
            usuarioId
        }
    });

    const [proyectos, proyecto] = await Promise.all([ proyectosPromise, proyectoPromise ]);
    //renderizado al view
    res.render( 'nuevoramo', {
        nombrePagina : 'Editar Ramo',
        proyectos,
        proyecto
    })
}
exports.actualizarRamo = async(req, res) => {
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
        await Proyectos.update(
                { nombre : nombre },
                { where : { id : req.params.id } }
            );
        res.redirect('/');

    }
}

exports.eliminarProyecto = async (req, res, next) => {
    //console.log(req);
    const {urlProyecto} = req.query;
    //Eliminar registro con DESTROY
    const resultado = await Proyectos.destroy({
        where : {
            url : urlProyecto
        }
    });

    if(!resultado){
        return next();//SE LANZA AL SIGUIENTE MIDDLEWARE
    }

    res.status(200).send('Asignatura Eliminada correctamente');
}