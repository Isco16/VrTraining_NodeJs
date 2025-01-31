// import query from 'express';
// const { query } = require('express');
// import {Pool} from 'pg';
// const { Pool } = require('pg');

// const pool = new Pool({
//   host: 'localhost',
//   user: 'postgres',
//   password: 'Isco64',
//   database: 'vrTrainingDb',
//   allowExitOnIdle: true,
// });

// import { DataTypes } from "sequelize";
const DataTypes = require('sequelize');
// import { sequelize } from "../db/connectionDb.js";
const sequelize = require("../db/connectionDb.js");
const User = require('./users.model.js');
// console.log(User.toString());

// module.exports = (sequelize, DataTypes) =>{
//   const Course = sequelize.define("courses", {
//     course_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//     },
//     description: {
//       type: DataTypes.STRING,
//     },
//     created_by: {
//       type: DataTypes.INTEGER,
//     },
//     created_at: {
//       type: DataTypes.DATE,
//     },
//     new_column: {
//       type: DataTypes.INTEGER,
//     }
//   });
  
//   // Course.hasMany(User , {
//   //   foreignKey: 'created_by',
//   //   sourceKey: 'user_id',
//   // });
  
//   // User.belongsTo(Course, {
//   //   foreignKey: 'created_by',
//   //   target_id: 'user_id',
//   // });

//   // Course.sync();
//   // Course.sync({ alter: true });

//   return Course;
// }


const Course = sequelize.define("courses", {
  course_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  created_by: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: User,
      key: 'user_id',
    }
  },
});

module.exports = Course;