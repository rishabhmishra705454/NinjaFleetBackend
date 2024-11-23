const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { jwtSecret, jwtExpiresIn } = require('../config/jwtConfig');
const sendResponse = require('../utils/responseFormatter');
const { Op } = require('sequelize');


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
        landType: user.landType,
        isActive: user.isActive,
        fcmToken: user.fcmToken,
      }
    }, 'Login successful');
  } catch (err) {
    sendResponse(res, 500, null, err.message);
  }
};
// Register function
exports.registerUser = async (req, res) => {
  const { farmerName, mobileNo, aadharNo, address, totalLand, landType,fcmToken,isLogin } = req.body;
  
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
      landType,
      fcmToken,
      isLogin 
    });

    // Generate JWT token after registration
    const token = jwt.sign({ id: newUser.id, mobileNo: newUser.mobileNo }, jwtSecret, { expiresIn: jwtExpiresIn });

    // Return the user data and token in the response
    return sendResponse(res, 201, {
      token,
      user: newUser
    }, 'User registered successfully.');
  } catch (err) {
    // Catch and send error if something goes wrong
    return sendResponse(res, 500, null, err.message);
  }
};

exports.getAllUsers = async (req, res) => {
  // Retrieve page, limit, and search query from query parameters
  const page = parseInt(req.query.page) || 1; // default to page 1
  const limit = parseInt(req.query.limit) || 10; // default to 10 items per page
  const searchQuery = req.query.search || ''; // get search query, default to empty string

  // Calculate the offset based on page and limit
  const offset = (page - 1) * limit;

  try {
    // Build the where clause for searching
    const whereClause = {
      [Op.or]: [
        { farmerName: { [Op.like]: `%${searchQuery}%` } }, // Use LIKE for MySQL
        { mobileNo: { [Op.like]: `%${searchQuery}%` } },
        { aadharNo: { [Op.like]: `%${searchQuery}%` } },
        { address: { [Op.like]: `%${searchQuery}%` } }
      ]
    };

    // Fetch users with pagination and search using limit, offset, and where clause
    const { rows: users, count: totalUsers } = await User.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      attributes: [
        'id', 
        'farmerName', 
        'mobileNo', 
        'aadharNo', 
        'aadharFront', 
        'aadharBack', 
        'address', 
        'totalLand', 
        'landType',
        'isActive',
        'fcmToken',
        'isLogin'

      ]
    });

    if (!users.length) {
      return sendResponse(res, 404, null, 'No users found.');
    }

    // Return paginated result and meta information (total users, current page, total pages)
    const totalPages = Math.ceil(totalUsers / limit);

    return sendResponse(res, 200, {
      users,
      meta: {
        totalUsers,
        currentPage: page,
        totalPages
      }
    }, 'Users retrieved successfully.');
  } catch (err) {
    // Catch and send error if something goes wrong
    return sendResponse(res, 500, null, err.message);
  }
};

// Delete user function (Admin only)
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if the user exists
    const user = await User.findByPk(userId);

    if (!user) {
      return sendResponse(res, 404, null, 'User not found.');
    }

    // Delete the user
    await user.destroy();

    // Send response after deletion
    return sendResponse(res, 200, null, 'User deleted successfully.');
  } catch (err) {
    // Catch and send error if something goes wrong
    return sendResponse(res, 500, null, err.message);
  }
};

// Get user profile function
exports.getUserProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID
    const user = await User.findByPk(userId);

    if (!user) {
      return sendResponse(res, 404, null, 'User not found.');
    }

    // Return the user profile
    return sendResponse(res, 200, {
      id: user.id,
      farmerName: user.farmerName,
      mobileNo: user.mobileNo,
      aadharNo: user.aadharNo,
      address: user.address,
      totalLand: user.totalLand,
      landType: user.landType,
      isActive: user.isActive,
      fcmToken: user.fcmToken,
      isLogin: user.isLogin
    }, 'User profile retrieved successfully.');
  } catch (err) {
    // Catch and send error if something goes wrong
    return sendResponse(res, 500, null, err.message);
  }
};