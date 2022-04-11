const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// console.log( process.env );


// Crear el servidor de express (con esto se levanta el servidor)
const app = express();

//Conectar a Base de datos
dbConnection();

// CORS
app.use( cors() );

// Directorio Publico ( aqui es donde se encuentran los archivos estaticos como nuestro index.html, es la base de todos los url )
app.use( express.static('public'));

// Lectura y parseo del body
app.use( express.json());


// Rutas (aqui lo que venga en la primer parte del use, es el host que es hosting que se utilice, y de a partir de ese url lo que se requiera tendra rutas especializadas pero a partir de el primer elemento )
app.use( '/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events'));





// Escuchar peticiones
app.listen( process.env.PORT , () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
