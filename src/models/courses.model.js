const DataTypes = require('sequelize');
const sequelize = require("../db/connectionDb.js");
const User = require('./users.model.js');

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