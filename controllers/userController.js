const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { jwtSecret, jwtExpiresIn } = require('../config/jwtConfig');
const sendResponse = require('../utils/responseFormatter');

// Login function
exports.login = async (req, res) => {
  const { mobileNo } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ where: { mobileNo } });

    if (!user) {
      // If user does not exist, return a message and status code
      return sendResponse(res, 404, null, 'User not found.');
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, mobileNo: user.mobileNo }, jwtSecret, { expiresIn: jwtExpiresIn });

    // Return the token and user data
    sendResponse(res, 200, {
      token,
      user: {
        id: user.id,
        farmerName: user.farmerName,
        mobileNo: user.mobileNo,
        aadharNo: user.aadharNo,
        aadharPhoto: user.aadharPhoto,
        address: user.address,
        totalLand: user.totalLand,
        landType: user.landType
      }
    }, 'Login successful');
  } catch (err) {
    sendResponse(res, 500, null, err.message);
  }
};
// Register function
exports.registerUser = async (req, res) => {
  const { farmerName, mobileNo, aadharNo, address, totalLand, landType } = req.body;
  
  // Retrieve the files for Aadhaar front and back
  const aadharFront = req.files['aadharFront'] ? req.files['aadharFront'][0].path : null;
  const aadharBack = req.files['aadharBack'] ? req.files['aadharBack'][0].path : null;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { mobileNo } });
    if (existingUser) {
      return sendResponse(res, 400, null, 'User is already registered.');
    }

    // Register new user
    const newUser = await User.create({
      farmerName,
      mobileNo,
      aadharNo,
      aadharFront, // Store the Aadhaar front image
      aadharBack,  // Store the Aadhaar back image
      address,
      totalLand,
      landType
    });

    sendResponse(res, 201, newUser, 'User registered successfully.');
  } catch (err) {
    sendResponse(res, 500, null, err.message);
  }
};