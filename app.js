const express = require('express');
const app = express();
const coursesRoute = require('./src/routes/courses.route.js');
const usersRoute = require('./src/routes/users.route.js')
const authRoute = require('./src/routes/auth.route.js');
const messagingRoute = require('./src/routes/messaging.route.js');

// middlewares para implementar el sistema de mensajeria
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const http = require('http');
const path = require('path');
// Nueva instancia de servidor HTTP. Se exporta
const server = http.createServer(app);

app.use(express.json());

/**
* Endpoint de APIs REST
*/
app.use('/api/v1/courses', coursesRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/messaging', messagingRoute);

/**
* Configuración de Middleware mensajeria
*/
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

module.exports = { app, path, server };