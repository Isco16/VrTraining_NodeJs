require('dotenv').config();

const { server } = require('./app.js');
const socketIOSetup = require('./src/services/messaging.js');

const sequelize = require('./src/db/connectionDb.js');
require('./src/models/models.js');
require('./src/models/associations.js');

const main = async () => {
  try {
    await sequelize.sync({ alter: true });

    console.log("Conecction to data base successful.");

    // Start the server
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    socketIOSetup();

  } catch (error) {
    console.log("The server couldn't connect to data base.", error);
  }
}

//Method for connection to data base.
main();