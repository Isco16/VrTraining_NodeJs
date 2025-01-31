// import { Sequelize } from "sequelize";
const Sequelize = require('sequelize');
// import dotenv from "dotenv";
require('dotenv').config(); // Load .env variables into process.env

// export const sequelize = new Sequelize(
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

// export default sequelize;
module.exports = sequelize;