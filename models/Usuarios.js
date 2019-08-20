const Sequelize = require( 'sequelize' );
const db = require( '../config/db' );
const Proyectos = require( '../models/Poyectos' );

const Usuarios = db.define( 'usuarios', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    email : {
        type : Sequelize.STRING(80),
        allowNull : false,

    },
    password : {
        type : Sequelize.STRING(60),// ----->> String recomendado por el Hasheo
        allowNull : false
    }
});

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;