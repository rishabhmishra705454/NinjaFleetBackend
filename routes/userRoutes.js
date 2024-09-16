const express = require('express');
const router = express.Router();
const upload = require('../utils/fileUpload');
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

// Route for logging in
router.post('/login', userController.login);

// Route for registering a user (no authentication required)
router.post('/register', upload.single('aadharPhoto'), userController.registerUser);

module.exports = router;
