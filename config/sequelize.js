require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ninjafleet', 'Rm765182', 'Rm765182', {
  host: 'ninjacart.mysql.database.azure.com',
 
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Set to true if you have a valid CA certificate
    }
  }
});

module.exports = sequelize;