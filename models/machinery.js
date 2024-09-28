const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Machinery = sequelize.define('Machinery', {
  providerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Providers',
      key: 'id',
    },
    onDelete: 'CASCADE' // If a provider is deleted, all their machinery is deleted
  },
  machineryName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false // E.g., Tractor, Harvester
  },
  model: {
    type: DataTypes.STRING, // Manufacturer and model of the machinery
    allowNull: true
  },
  capacity: {
    type: DataTypes.STRING, // Could be horsepower, weight capacity, etc.
    allowNull: true
  },
  condition: {
    type: DataTypes.STRING,
    defaultValue: 'Used' // Can be New, Used, Needs Maintenance
  },
  fuelType: {
    type: DataTypes.STRING, // Diesel, Petrol, Electric
    allowNull: true
  },
  pricing: {
    type: DataTypes.DECIMAL(10, 2), // Cost per hour
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  availabilityStart: {
    type: DataTypes.DATE,
    allowNull: false
  },
  availabilityEnd: {
    type: DataTypes.DATE,
    allowNull: false
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false
  },
  images: {
    type: DataTypes.JSON, // Store array of image URLs/paths as JSON
    allowNull: true
  },
  maintenanceSchedule: {
    type: DataTypes.DATE,
    allowNull: true
  },
  lastServiceDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  insuranceStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  usageRestrictions: {
    type: DataTypes.TEXT, // Text for any booking restrictions
    allowNull: true
  },
  availableDays: {
    type: DataTypes.JSON, // Store available days as JSON array
    allowNull: true
  },
  insuranceExpiry: {
    type: DataTypes.DATE,
    allowNull: true
  },
  operatorRequired: {
    type: DataTypes.BOOLEAN,
    defaultValue: false // If operator is needed for this machinery
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = Machinery;
