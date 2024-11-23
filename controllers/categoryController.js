const Category = require('../models/category')
const sendResponse = require('../utils/responseFormatter')

// Create a new category
exports.createCategory = async (req , res ) => {

    const {name,description} = req.body;

    let image =null;

    if(req.file){
        image = req.file.path;
    }

    try {
        const newCategory = await Category.create({
            name,
            description,
            image
        });

        sendResponse(res,201,newCategory,'Category created successfully');
    } catch (err) {
        if(err.name === 'SequelizeValidationError'){
            const messages = err.errors.map(e => e.message).join(', ');
            return sendResponse(res,400,null,`Validation error: ${messages}`);
        }
        return sendResponse(res,500,null,'An error occurred while creating the category: ' + err.message);
    }

}

exports.getAllCategories = async (req, res) => {
    try {
      const categories = await Category.findAll();
      sendResponse(res, 200, categories, 'Categories retrieved successfully.');
    } catch (err) {
      return sendResponse(res, 500, null, 'An error occurred while fetching categories: ' + err.message);
    }
  };

  exports.getCategoryById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const category = await Category.findByPk(id);
  
      if (!category) {
        return sendResponse(res, 404, null, 'Category not found.');
      }
  
      sendResponse(res, 200, category, 'Category retrieved successfully.');
    } catch (err) {
      return sendResponse(res, 500, null, 'An error occurred while fetching the category: ' + err.message);
    }
  };

  exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    let image = null;
  
    // Handle uploaded image
    if (req.file) {
      image = req.file.path; // Store the file path of the uploaded image
    }
  
    try {
      const category = await Category.findByPk(id);
  
      if (!category) {
        return sendResponse(res, 404, null, 'Category not found.');
      }
  
      // Update only the fields that are provided
      const updatedFields = {};
      if (name !== undefined) updatedFields.name = name;
      if (description !== undefined) updatedFields.description = description;
      if (image !== null) updatedFields.image = image;
  
      await category.update(updatedFields);
      sendResponse(res, 200, category, 'Category updated successfully.');
    } catch (err) {
      return sendResponse(res, 500, null, 'An error occurred while updating the category: ' + err.message);
    }
  };
  

  exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
  
    try {
      const category = await Category.findByPk(id);
  
      if (!category) {
        return sendResponse(res, 404, null, 'Category not found.');
      }
  
      await category.destroy();
      sendResponse(res, 200, null, 'Category deleted successfully.');
    } catch (err) {
      return sendResponse(res, 500, null, 'An error occurred while deleting the category: ' + err.message);
    }
  };