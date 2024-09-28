const express = require('express');
const router = express.Router();
const upload = require('../utils/fileUpload');
const machineryController = require('../controllers/machinaryController');
const authenticateToken = require('../middleware/authMiddleware'); 
// Route for adding new machinery
router.post('/machinery', 
  upload.array('images', 5), 
  machineryController.registerMachinery
);

// Get machinery by ID
router.get('/machinery/:id', machineryController.getMachineryById);

// Update machinery by ID (with image upload handling)
router.put('/machinery/:id', 
  upload.array('images', 5), 
  machineryController.updateMachinery
);

// Delete machinery by ID
router.delete('/machinery/:id', machineryController.deleteMachinery);

// Get all machinery by provider ID
router.get('/machinery/provider/:providerId', machineryController.getMachineryByProviderId);

// Get all machinery with query filters (pagination, sorting, filtering)
router.get('/machinery', machineryController.getAllMachinery);

module.exports = router;