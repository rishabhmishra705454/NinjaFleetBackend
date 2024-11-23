const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const sendResponse = require('../utils/responseFormatter');
const { jwtSecret, jwtExpiresIn } = require('../config/jwtConfig');

// Admin login
exports.adminLogin = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Find admin by username
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return sendResponse(res, 400, null, 'Invalid email or password.');
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return sendResponse(res, 400, null, 'Invalid email or password.');
    }

    // Generate token
    const token = jwt.sign(
      { username: admin.username, role: 'admin' },
      jwtSecret, { expiresIn: jwtExpiresIn }
    );
   
    sendResponse(res, 200, { token ,admin }, 'Login successful.');
  } catch (err) {
    sendResponse(res, 500, null, 'An error occurred during login: ' + err.message);
  }
};
