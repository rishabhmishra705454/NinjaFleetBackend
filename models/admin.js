const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Admin = sequelize.define("Admin", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Ensures the email format is valid
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Before saving the admin, hash the password
Admin.beforeCreate(async (admin, options) => {
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
});

module.exports = Admin;
