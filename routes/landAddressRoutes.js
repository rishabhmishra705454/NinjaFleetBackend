const express = require('express');
const router = express.Router();
const landAddressController = require('../controllers/landAddressController');

// Route to add a new land address
router.post('/land-address', landAddressController.addLandAddress);

// Route to update a land address
router.put('/land-address/:id', landAddressController.updateLandAddress);

// Route to delete a land address
router.delete('/land-address/:id', landAddressController.deleteLandAddress);

// Route to fetch all land addresses by user ID
router.get('/land-address/user/:userId', landAddressController.getLandAddressesByUserId);

module.exports = router;