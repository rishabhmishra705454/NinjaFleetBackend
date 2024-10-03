const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Booking = sequelize.define('Booking', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  machineryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Machinery',
      key: 'id',
    },
  },
  providerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Providers',
      key: 'id',
    },
  },
  landCoordinates: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  landArea: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(
      'Pending',
      'Confirmed',
      'In Progress',
      'Completed',
      'Cancelled by User',
      'Cancelled by Provider',
      'Rejected',
      'Failed',
      'Awaiting Payment',  // Optional, if needed
      'Payment Failed'      // Optional, if needed
    ),
    defaultValue: 'Pending',
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = Booking;
