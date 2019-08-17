const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
//helpers con funciones
const helpers = require('./helpers');

//creando conexion a la db
const db = require('./config/db');

//importando el modelo
require('./models/Poyectos');

db.sync()
    .then(() => console.log('Conectado al Servidor'))
    .catch(error => console.log(error));

// Crear una aplicacion de express
const app = express();

//cargar archivos estaticos
app.use(express.static('public'));
//Habilitando pug
app.set('view engine', 'pug');
//Anadir carpetas de vistas
app.set('views', path.join(__dirname, './views'));
//insertar un vardump a la aplicacion
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;//crear variables  para consumir en cualquier lado
    next();
})
app.use((req, res, next) => {
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();
    next();
})
//Habilitar bodyParser
app.use(bodyParser.urlencoded({extended : true}));


app.use('/', routes() );

app.listen(3000);

