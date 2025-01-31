const DataTypes = require('sequelize');
const sequelize = require("../db/connectionDb.js");
// const Course = require('./courses.model.js');
const bcrypt = require('bcryptjs/dist/bcrypt.js');

// module.exports = (sequelize, DataTypes) =>{
//     const User = sequelize.define("users", {
//         user_id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         name: {
//             type: DataTypes.STRING,
//         },
//         email: {
//             type: DataTypes.STRING,
//         },
//         role: {
//           type: DataTypes.STRING,
//         },
//         password_hash: {
//           type: DataTypes.STRING,
//         },
//         created_at: {
//           type: DataTypes.DATE,
//         },
//         last_login: {
//           type: DataTypes.DATE,
//         }
//     });
    
//     // User.sync();

//     return User;
// }

const User = sequelize.define("users", {
  user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  name: {
      type: DataTypes.STRING,
  },
  email: {
      type: DataTypes.STRING,
      unique: true,
  },
  role: {
    type: DataTypes.STRING,
  },
  password_hash: {
    type: DataTypes.STRING,
  },
  // created_at: {
  //   type: DataTypes.DATE,
  // },
  // last_login: {
  //   type: DataTypes.DATE,
  // }
});

User.beforeCreate(async (user) => {
  user.password_hash = await bcrypt.hash(user.password_hash, 8);
});

module.exports = User;