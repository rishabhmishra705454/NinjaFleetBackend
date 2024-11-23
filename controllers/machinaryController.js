const Machinery = require('../models/machinery');
const sendResponse = require('../utils/responseFormatter');

// Register Machinery
exports.registerMachinery = async (req, res) => {
  const {
    providerId, machineryName, categoryId, model, capacity, condition,
    fuelType, pricing, availabilityStart, availabilityEnd,
    latitude, longitude, maintenanceSchedule, lastServiceDate,
    insuranceStatus, usageRestrictions, availableDays, insuranceExpiry, operatorRequired
  } = req.body;

  try {
    // Handle uploaded images
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => file.path); // Store the file paths of the uploaded images
    }

    const newMachinery = await Machinery.create({
      providerId, machineryName, categoryId, model, capacity, condition,
      fuelType, pricing, availabilityStart, availabilityEnd,
      latitude, longitude, images, maintenanceSchedule, lastServiceDate,
      insuranceStatus, usageRestrictions, availableDays, insuranceExpiry, operatorRequired
    });

    sendResponse(res, 201, newMachinery, 'Machinery registered successfully.');
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const messages = err.errors.map(e => e.message).join(', ');
      return sendResponse(res, 400, null, `Validation error: ${messages}`);
    }
    return sendResponse(res, 500, null, 'An error occurred while registering the machinery: ' + err.message);
  }
};


// Get Machinery by ID
exports.getMachineryById = async (req, res) => {
  const { id } = req.params;

  try {
    const machinery = await Machinery.findOne({ where: { id } });

    if (!machinery) {
      return sendResponse(res, 404, null, 'Machinery not found.');
    }

    sendResponse(res, 200, machinery, 'Machinery details fetched successfully.');
  } catch (err) {
    return sendResponse(res, 500, null, 'An error occurred while fetching machinery details: ' + err.message);
  }
};

// Update Machinery by ID
exports.updateMachinery = async (req, res) => {
  const { id } = req.params;
  const {
    providerId, machineryName, categoryId, model, capacity, condition,
    fuelType, pricing, availabilityStart, availabilityEnd,
    latitude, longitude, maintenanceSchedule, lastServiceDate,
    insuranceStatus, usageRestrictions, availableDays, insuranceExpiry, operatorRequired
  } = req.body;

  try {
    const machinery = await Machinery.findOne({ where: { id } });

    if (!machinery) {
      return sendResponse(res, 404, null, 'Machinery not found.');
    }

    // Handle uploaded images
    let images = machinery.images;
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => file.path); // Update with new images if provided
    }

    // Update machinery details
    await machinery.update({
      providerId, machineryName, categoryId, model, capacity, condition,
      fuelType, pricing, availabilityStart, availabilityEnd,
      latitude, longitude, images, maintenanceSchedule, lastServiceDate,
      insuranceStatus, usageRestrictions, availableDays, insuranceExpiry, operatorRequired
    });

    sendResponse(res, 200, machinery, 'Machinery updated successfully.');
  } catch (err) {
    return sendResponse(res, 500, null, 'An error occurred while updating the machinery: ' + err.message);
  }
};

// Delete Machinery by ID
exports.deleteMachinery = async (req, res) => {
  const { id } = req.params;

  try {
    const machinery = await Machinery.findOne({ where: { id } });

    if (!machinery) {
      return sendResponse(res, 404, null, 'Machinery not found.');
    }

    await machinery.destroy(); // Delete the machinery record
    sendResponse(res, 200, null, 'Machinery deleted successfully.');
  } catch (err) {
    return sendResponse(res, 500, null, 'An error occurred while deleting the machinery: ' + err.message);
  }
};

// Get all machinery by provider ID
exports.getMachineryByProviderId = async (req, res) => {
  const { providerId } = req.params;

  try {
    const machineryList = await Machinery.findAll({ where: { providerId } });

    if (!machineryList.length) {
      return sendResponse(res, 404, null, 'No machinery found for this provider.');
    }

    sendResponse(res, 200, machineryList, 'Machinery list fetched successfully.');
  } catch (err) {
    return sendResponse(res, 500, null, 'An error occurred while fetching machinery list: ' + err.message);
  }
};

// Get all machinery with query filters (pagination, sorting, filtering)
exports.getAllMachinery = async (req, res) => {
  const { page = 1, limit = 10, sort = 'createdAt', order = 'DESC', category, isActive } = req.query;

  try {
    // Build query options based on filters
    const queryOptions = {
      limit: parseInt(limit), // Limit the number of results per page
      offset: (parseInt(page) - 1) * parseInt(limit), // Skip for pagination
      order: [[sort, order.toUpperCase()]], // Sorting
    };

    // Adding additional filters (like category or active status)
    const whereClause = {};
    if (category) whereClause.category = category;
    if (isActive !== undefined) whereClause.isActive = isActive === 'true';

    // Add filters to query options
    queryOptions.where = whereClause;

    // Fetch machinery with query filters
    const { rows: machineryList, count: total } = await Machinery.findAndCountAll(queryOptions);

    // If no machinery is found
    if (!machineryList.length) {
      return sendResponse(res, 404, null, 'No machinery found.');
    }

    // Return paginated result
    const totalPages = Math.ceil(total / limit);
    const result = {
      machinery: machineryList,
      pagination: {
        totalItems: total,
        currentPage: parseInt(page),
        totalPages,
        itemsPerPage: parseInt(limit),
      },
    };

    sendResponse(res, 200, result, 'Machinery list fetched successfully.');
  } catch (err) {
    return sendResponse(res, 500, null, 'An error occurred while fetching machinery list: ' + err.message);
  }
};
