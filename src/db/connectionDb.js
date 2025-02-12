const Sequelize = require('sequelize');
require('dotenv').config(); // Load .env variables into process.env

//Sequelize initialization.
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, {
    host: "localhost",
    // port: process.env.DB_PORT,
    dialect: "postgres",
    // logging: false
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false
    //     }
    // }
});

module.exports = sequelize;