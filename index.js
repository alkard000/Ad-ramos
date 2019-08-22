const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
//helpers con funciones
const helpers = require('./helpers');

//creando conexion a la db
const db = require('./config/db');

//importando el modelo
require('./models/Poyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
    .then(() => console.log('Conectado al Servidor'))
    .catch(error => console.log(error));

// Crear una aplicacion de express
const app = express();
//cargar archivos estaticos
app.use(express.static('public'));
//Habilitando pug
app.set('view engine', 'pug');
//Habilitar bodyParser
app.use(bodyParser.urlencoded({extended : true}));
//Agregar Exrpess validator a la aplicacion
app.use(expressValidator());
//Anadir carpetas de vistas
app.set('views', path.join(__dirname, './views'));
//INCLUIR COOKIES
//app.use(cookieParser());
//incluir express session -------->> NAVEGAR POR PAGINA SIN NECESIDAD DE VOLVER A CARGAR
app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
//incluir flash
app.use(flash());
//insertar un vardump a la aplicacion
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;//crear variables  para consumir en cualquier lado
    res.locals.mensajes = req.flash();
    next();
})
app.use((req, res, next) => {
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();
    next();
})


app.use('/', routes() );

app.listen(5000);

