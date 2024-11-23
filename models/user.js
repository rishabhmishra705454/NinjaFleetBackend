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
    type: DataTypes.STRING, 
  },
  aadharBack: {
    type: DataTypes.STRING, 
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
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isLogin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  
  },
  fcmToken: {
    type: DataTypes.STRING, 
    allowNull: true
  },
}, {
  timestamps: true
});

module.exports = User;
