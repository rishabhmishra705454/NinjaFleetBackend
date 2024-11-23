const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT, 
    allowNull: true
  }
}, {
  timestamps: true 
});

module.exports = Category;