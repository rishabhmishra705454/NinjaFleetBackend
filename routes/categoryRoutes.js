const express = require('express');
const router = express.Router();
const upload = require('../utils/fileUpload');
const categoryController = require('../controllers/categoryController');


// Route for creating a new category with image upload
router.post('/categories', upload.single('image'), categoryController.createCategory);

// Route for getting all categories
router.get('/categories', categoryController.getAllCategories);

// Route for getting a category by ID
router.get('/categories/:id', categoryController.getCategoryById);

// Route for updating a category by ID with image upload
router.put('/categories/:id', upload.single('image'), categoryController.updateCategory);

// Route for deleting a category by ID
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;

