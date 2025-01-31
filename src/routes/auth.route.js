const { Router } = require("express");
const { 
    register, 
    login 
} = require('../controllers/auth.controller.js');

const authRoute = Router();

authRoute.post('/register', register);
authRoute.get('/login', login);

module.exports = authRoute;