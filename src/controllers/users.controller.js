const sequelize = require('../db/connectionDb.js');
const User = require('../models/users.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs/dist/bcrypt.js');

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    }
    catch (error) {
        console.error(`An ERROR has occurred when getting all users: ${error}`);
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await User.findByPk(id);
        console.log(resultado);
        res.json(resultado);
    }
    catch (error) {
        console.error(`An ERROR has occurred when getting the user: ${error}`);
    }
}

const addUser = async (req, res) => {
    const { name, email, role, password_hash } = req.body;
    try {
        
        const newUser = await User.create({
            name,
            email,
            role,
            password_hash,
        });
        const token = jwt.sign({id: newUser.user_id},
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        // res.status(201).json({newUser, token});
        res.status(201).json({newUser});
    } catch (error) {
        res.status(500).json({
            message: `An ERROR has occured when creating the user: ${error}`,
        })
        // console.error(`An ERROR has occured when creating the user: ${error}`);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.destroy({
            where: { user_id: id }
        });
        res.json({ message: 'User deleted successfully' + deletedUser });
    } catch (error) {
        console.log(`An ERROR has occurred when deleting the user: ${error}`);
        res.status(500).json({ message: 'An ERROR has occurred when deleting the user.' }, error);
    }

};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role, password_hash } = req.body;
        const updatedUser = await User.update(
            {
                name: name,
                email: email,
                role: role,
                password_hash: password_hash,
            },
            {
                where: { user_id: id }
            });
        res.json({ message: 'Registry updated successfully.' + updatedUser });
    } catch (error) {
        console.error(`An ERROR has occured when updating the user: ${error}`);
        res.status(500).send(error);
    }

};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log({ email, password });
        const user = await User.findOne({ where: {email: email}});
        if(!user)
            return res.status(400).json({ message: "las credenciales ingresadas no son correctas." });
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if(!isMatch){
            return res.status(400).json({message: "El password ingresado no es correcto."});
        }
        const token = jwt.sign(
            { id: user.user_id },
            process.env.JWT_SECRET,
            { expiresIn: "1h"}
        );
        res.json({ user, token});
    } catch (error) {
        console.log({ message: error.message });
        return res.status(500).json({
            message: error.message,
        });
    }
};

// export const userController = { register, login };

module.exports = {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser,
    login,
};