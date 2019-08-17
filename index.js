const express = require('express');
const routes = require('./routes');
const path = require('path');

// Crear una aplicacion de express

const app = express();

//Habilitando pug
app.set('view engine', 'pug');
//Anadir carpetas de vistas
app.set('views', path.join(__dirname, './views'));

app.use('/', routes() );

app.listen(3000);

