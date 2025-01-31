require('dotenv').config(); // Load .env variables into process.env
// const express = require('express');
// import express from "express";
// const app = express();
// module.exports = app;

// import coursesRoute from './src/routes/courses.route.js';
// const coursesRoute = require('./src/routes/courses.route.js');

const app = require('./app.js');

// import { sequelize } from './src/db/connectionDb.js';
const sequelize = require('./src/db/connectionDb.js');
// const User = require('./src/models/users.model.js');
// const Course = require('./src/models/courses.model.js');
require('./src/models/models.js');
require('./src/models/associations.js');

const main = async () => {
  try {
    
    // await sequelize.authenticate();
    // await sequelize.sync({ force: false }).then(result => {
    //   // console.log(result);
    // })
    // .catch(err => {
    //   console.log(err);
    // });

    await sequelize.sync({ alter: true });

    console.log("Conexion a la base de datos realizada con exito");

    // app.use(express.json());
    // app.use('/api/v1/courses', coursesRoute);

    const port = process.env.DEFAULT_PORT || 3000;
    app.listen(port, console.log(`Server running on port: ${port}`));
    // app.get('/', (req, res) => {
    //   res.send('Hellow world!');
    // });

  } catch (error) {
    console.log("Nose se pudo conectar a la base de datos", error);
  }
}

main();