const express = require('express');
const router = express.Router();
const upload = require('../utils/fileUpload'); // If you plan to upload documents
const providerController = require('../controllers/providerController');
const authenticateToken = require('../middleware/authMiddleware'); // Optional, if you want to protect routes

// Route for provider registration
router.post('/providers', 

  upload.single('documents'), // Assuming you have a single document upload
  providerController.registerProvider
);

// Route for fetching all providers with pagination and search
router.get('/providers', 
  providerController.fetchAllProviders
);

// Route for updating a provider
router.put('/providers/:providerId', providerController.updateProvider);

// Route for deleting a provider
router.delete('/providers/:providerId', providerController.deleteProvider);
router.get('/providers/:providerId',providerController.fetchProviderById);
module.exports = router;
