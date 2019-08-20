const Sequelize = require( 'sequelize' );
const db = require( '../config/db' );
const Proyectos = require( '../models/Poyectos' );
const bcrypt = require( 'bcrypt-nodejs' );

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
}, {
    hooks : {
        beforeCreate(usuario) {
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10)); // -------->> HASHEO DE PASSWORD en 10
        }
    }
});

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;