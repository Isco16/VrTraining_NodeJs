const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs/dist/bcrypt.js');
const User = require('../models/users.model.js');

// Register user.
const register = async (req, res) => {
    const { name, email, role, password_hash } = req.body;
    try {
        if(!name){
            console.log("Ingrese nombre");
            return res.status(400).json("Ingrese nombre");
        }

        if(!email){
            console.log("Ingrese email");
            return res.status(400).json("Ingrese email");
        }
        
        const newUser = await User.create({
            name,
            email,
            role,
            password_hash,
        });
        const token = jwt.sign(
            { name: newUser.name, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({newUser, token});
    } catch (error) {
        res.status(500).json({
            message: `An ERROR has occured when creating the user: ${error}`,
        })
    }
};

//Login a user.
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
            { name: user.name, email: user.email },
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

module.exports = {
    register,
    login,
}