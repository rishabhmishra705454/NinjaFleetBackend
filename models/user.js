const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
  farmerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobileNo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  aadharNo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  aadharFront: {
    type: DataTypes.STRING, // Path to Aadhaar front image
  },
  aadharBack: {
    type: DataTypes.STRING, // Path to Aadhaar back image
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalLand: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  landType: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;
