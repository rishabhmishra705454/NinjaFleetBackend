const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminLoginController')

const userController = require('../controllers/userController');

const verifyAdminToken = require('../middleware/adminMiddleware');
// Route to get all users (Admin only)
router.get('/admin/users',verifyAdminToken, userController.getAllUsers);

// Route to delete a user by ID (Admin only)
router.delete('/admin/users/:userId', userController.deleteUser);
// Admin login route
router.post('/admin/login', adminController.adminLogin);


module.exports = router;
