const { Router } = require("express");
const {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    login,
} = require('../controllers/users.controller');
const { requireAuth } = require('../middlewares/authMiddleware.js');

const usersRoute = Router();

usersRoute.get('/', requireAuth, getUsers);

usersRoute.get('/:id', getUser);

usersRoute.post('/', addUser);

usersRoute.put('/:id', updateUser);

usersRoute.delete('/:id', deleteUser);

usersRoute.get('/sesion/login', login);

usersRoute.get('/sesion/dashboard', requireAuth, function(req, res){
    try{
        res.send('<h1>Hello Express! </h1>');
    }catch(err){
        res.status(500).json({ message: "Access not authorized" });
    }
});

module.exports = usersRoute;