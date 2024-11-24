const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const bookingController = require('../controllers/bookingController');

// Booking Routes
router.post('/bookings', bookingController.createBooking); // Create booking
router.get('/bookings/:id', bookingController.getBookingById); // Get booking by ID
router.patch('/bookings/:id/status', bookingController.updateBookingStatus); // Update booking status
router.delete('/bookings/:id', bookingController.deleteBooking); // Delete booking by ID
router.get('/users/:userId/bookings', bookingController.getBookingsByUserId); // Get all bookings by user ID
router.get('/bookings', bookingController.getAllBookings); // Get all bookings with filters

module.exports = router;