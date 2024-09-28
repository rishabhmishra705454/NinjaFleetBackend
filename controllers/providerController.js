const { Op } = require('sequelize'); // Import Sequelize operators
const sendResponse = require('../utils/responseFormatter');
const Provider = require('../models/provider');

// Register Provider
exports.registerProvider = async (req, res) => {
  const { providerName, mobileNo, address, latitude, longitude } = req.body;

  try {
    const newProvider = await Provider.create({
      providerName,
      mobileNo,
      address,
      latitude,
      longitude
      
    });
    sendResponse(res, 201, newProvider, 'Provider registered successfully.');
  } catch (err) {
    // Handle validation errors
    if (err.name === 'SequelizeValidationError') {
      const messages = err.errors.map(e => e.message).join(', ');
      return sendResponse(res, 400, null, `Validation error: ${messages}`);
    }
    
    // Handle unique constraint error
    if (err.name === 'SequelizeUniqueConstraintError') {
      return sendResponse(res, 400, null, 'Mobile number must be unique.');
    }

    // Generic error handling
    return sendResponse(res, 500, null, 'An error occurred while registering the provider: ' + err.message);
  }
};

// Fetch All Providers with Pagination and Search
exports.fetchAllProviders = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // default to page 1
  const limit = parseInt(req.query.limit) || 10; // default to 10 items per page
  const searchQuery = req.query.search || ''; // get search query, default to empty string

  const offset = (page - 1) * limit;

  try {
    // Build the where clause for searching
    const whereClause = {
      [Op.or]: [
        { providerName: { [Op.like]: `%${searchQuery}%` } },
        { mobileNo: { [Op.like]: `%${searchQuery}%` } },
        { address: { [Op.like]: `%${searchQuery}%` } }
      ]
    };

    // Fetch providers with pagination and search
    const { rows: providers, count: totalProviders } = await Provider.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      attributes: [
        'id',
        'providerName',
        'mobileNo',
        'address',
        'latitude',
        'longitude',
      ]
    });

    if (!providers.length) {
      return sendResponse(res, 404, null, 'No providers found.');
    }

    // Return paginated result and meta information (total providers, current page, total pages)
    const totalPages = Math.ceil(totalProviders / limit);

    return sendResponse(res, 200, {
      providers,
      meta: {
        totalProviders,
        currentPage: page,
        totalPages
      }
    }, 'Providers retrieved successfully.');
  } catch (err) {
    return sendResponse(res, 500, null, 'An error occurred while fetching providers: ' + err.message);
  }
};

// Update Provider
exports.updateProvider = async (req, res) => {
    const { providerId } = req.params; // Assume providerId is passed in the URL
    const { providerName, mobileNo, address, latitude, longitude } = req.body;
  
    try {
      // Find the provider by ID
      const provider = await Provider.findByPk(providerId);
      
      if (!provider) {
        return sendResponse(res, 404, null, 'Provider not found.');
      }
  
      // Update provider details
      await provider.update({
        providerName,
        mobileNo,
        address,
        latitude,
        longitude,
        
      });
  
      return sendResponse(res, 200, provider, 'Provider updated successfully.');
    } catch (err) {
      // Handle validation errors
      if (err.name === 'SequelizeValidationError') {
        const messages = err.errors.map(e => e.message).join(', ');
        return sendResponse(res, 400, null, `Validation error: ${messages}`);
      }
      
      // Handle unique constraint error
      if (err.name === 'SequelizeUniqueConstraintError') {
        return sendResponse(res, 400, null, 'Mobile number must be unique.');
      }
  
      return sendResponse(res, 500, null, 'An error occurred while updating the provider: ' + err.message);
    }
  };
  
  // Delete Provider
  exports.deleteProvider = async (req, res) => {
    const { providerId } = req.params; // Assume providerId is passed in the URL
  
    try {
      const provider = await Provider.findByPk(providerId);
      
      if (!provider) {
        return sendResponse(res, 404, null, 'Provider not found.');
      }
  
      // Delete the provider
      await provider.destroy();
  
      return sendResponse(res, 200, null, 'Provider deleted successfully.');
    } catch (err) {
      return sendResponse(res, 500, null, 'An error occurred while deleting the provider: ' + err.message);
    }
  };
  
  // Fetch Single Provider by ID
exports.fetchProviderById = async (req, res) => {
  const { providerId } = req.params; // Assume providerId is passed in the URL

  try {
    // Find the provider by ID
    const provider = await Provider.findByPk(providerId, {
      attributes: [
        'id',
        'providerName',
        'mobileNo',
        'address',
        'latitude',
        'longitude',
      ],
    });

    if (!provider) {
      return sendResponse(res, 404, null, 'Provider not found.');
    }

    // Return the found provider
    return sendResponse(res, 200, provider, 'Provider retrieved successfully.');
  } catch (err) {
    return sendResponse(res, 500, null, 'An error occurred while fetching the provider: ' + err.message);
  }
};
