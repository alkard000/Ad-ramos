const express = require('express');

// Crear una aplicacion de express

const app = express();

// Rutas para le home

app.use('/', (req, res) => {
    res.send('Hola Mundo');
});

app.listen(3000);

