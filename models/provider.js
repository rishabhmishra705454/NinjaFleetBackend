const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Provider = sequelize.define('Provider', {
  providerName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, 
    }
  },
  mobileNo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
    validate: {
      isNumeric: true, 
      notEmpty: true,
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, 
    }
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8), // Latitude up to 8 decimal places
    allowNull: false,
    validate: {
      isDecimal: true // Ensure it's a valid latitude
    }
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8), // Longitude up to 8 decimal places
    allowNull: false,
    validate: {
      isDecimal: true // Ensure it's a valid longitude
    }
  },
  
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

module.exports = Provider;
