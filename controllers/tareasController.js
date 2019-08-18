const Proyectos = require('../models/Poyectos');
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req, res, next) => {
    //Se obtiene la Asigantura
    const proyecto = await Proyectos.findOne({
        where : {
            url : req.params.url
        }
    });
    //Leer valor del Input
    const {tarea} = req.body;
    //Booleano => 1 = Completo | 0 = Incompleto
    const estado = 0; //  => 0 por default
    const proyectoId = proyecto.id;
    //Insertar a la BD y redirigir
    const resultado = await Tareas.create({ tarea, estado, proyectoId });

    if(!resultado){
        return next();
    }
    req.redirect(`/proyectos/${ req.params.url }`);
}

exports.cambiarEstadoTarea = async (req, res) => {
    const { id } = req.params;
    const tarea = await Tareas.findOne({where : { id }});

    //Cambiar estado de 0 a 1
    let estado = 0

    if(tarea.estado === estado){
        estado = 1;
    }
    tarea.estado = estado;

    const resultado = await tarea.save();

    if(!resultado) return next();

    res.status(200).send('Actulizado');
}

exports.eliminarTarea = async (req, res) => {

    const { id } = req.params;

    // Delete Tarea

    const resultado = await Tareas.destroy({
        where : {
            id
        }
    });

    if(!resultado) return next();

    res.status(200).send('Tarea Eliminada');
}