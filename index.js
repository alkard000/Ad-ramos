const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

// Crear una aplicacion de express

const app = express();

//cargar archivos estaticos
app.use(express.static('public'));

//Habilitando pug
app.set('view engine', 'pug');
//Anadir carpetas de vistas
app.set('views', path.join(__dirname, './views'));
//Habilitar bodyParser
app.use(bodyParser.urlencoded({extended : true}));


app.use('/', routes() );

app.listen(3000);

