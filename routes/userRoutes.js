const express = require('express');
const router = express.Router();
const upload = require('../utils/fileUpload');
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

// Route for logging in
router.post('/login', userController.login);

// Route for user registration with two image uploads (Aadhaar Front and Back)
router.post('/register', upload.fields([
    { name: 'aadharFront', maxCount: 1 }, // Aadhaar front image field
    { name: 'aadharBack', maxCount: 1 }   // Aadhaar back image field
  ]), userController.registerUser);
  

module.exports = router;
