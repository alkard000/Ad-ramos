const express = require('express');
const routes = require('./routes');

// Crear una aplicacion de express

const app = express();

app.use('/', routes() );

app.listen(3000);

