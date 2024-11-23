const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./user');

const LandAddress = sequelize.define('LandAddress', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nearby: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  coordinates: {
    type: DataTypes.JSON,
    allowNull: false,
  },
}, {
  timestamps: true,
});

User.hasMany(LandAddress, { foreignKey: 'userId' });
LandAddress.belongsTo(User, { foreignKey: 'userId' });

module.exports = LandAddress;