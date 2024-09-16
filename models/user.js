const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
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
    allowNull: false,
    unique: true
  },
  aadharPhoto: {
    type: DataTypes.STRING // Path to the Aadhaar photo
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
}, {
  timestamps: true 
});

module.exports = User;
