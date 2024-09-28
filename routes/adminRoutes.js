const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Route to get all users (Admin only)
router.get('/admin/users', userController.getAllUsers);

// Route to delete a user by ID (Admin only)
router.delete('/admin/users/:userId', userController.deleteUser);

module.exports = router;
