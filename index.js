require('dotenv').config();

const app = require('./app.js');

const sequelize = require('./src/db/connectionDb.js');
require('./src/models/models.js');
require('./src/models/associations.js');

const main = async () => {
  try {
    await sequelize.sync({ alter: true });

    console.log("Conecction to data base successful.");

    const port = process.env.DEFAULT_PORT || 3000;
    app.listen(port, console.log(`Server running on port: ${port}`));
  } catch (error) {
    console.log("The server couldn't connect to data base.", error);
  }
}

//Method for connection to data base.
main();