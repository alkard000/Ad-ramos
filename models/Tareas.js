const Sequeleze = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Poyectos');

const Tareas = db.define('tareas', {
    id : {
        type : Sequeleze.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    tarea : Sequeleze.STRING(100),
    estado : Sequeleze.INTEGER(1)
});

Tareas.belongsTo(Proyectos);//Realizar una llave Foranea para SQL

module.exports = Tareas;
