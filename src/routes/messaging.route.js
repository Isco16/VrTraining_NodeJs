const path = require('path');
const { Router } = require("express");

const messagingRoute = Router();

// Ruta para servir el cliente HTML del sistema de mensajeria.
messagingRoute.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = messagingRoute;