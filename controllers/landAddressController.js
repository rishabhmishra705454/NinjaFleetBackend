const LandAddress = require('../models/landAddress');
const sendResponse = require('../utils/responseFormatter');

// Add a new land address
exports.addLandAddress = async (req, res) => {
  const { userId, name, address, nearby, coordinates } = req.body;

  try {
    const newLandAddress = await LandAddress.create({ userId, name, address, nearby, coordinates });
    sendResponse(res, 201, newLandAddress, 'Land address added successfully.');
  } catch (err) {
    sendResponse(res, 500, null, 'An error occurred while adding the land address: ' + err.message);
  }
};

// Update a land address
exports.updateLandAddress = async (req, res) => {
  const { id } = req.params;
  const { name, address, nearby, coordinates } = req.body;

  try {
    const landAddress = await LandAddress.findByPk(id);

    if (!landAddress) {
      return sendResponse(res, 404, null, 'Land address not found.');
    }

    await landAddress.update({ name, address, nearby, coordinates });
    sendResponse(res, 200, landAddress, 'Land address updated successfully.');
  } catch (err) {
    sendResponse(res, 500, null, 'An error occurred while updating the land address: ' + err.message);
  }
};

// Delete a land address
exports.deleteLandAddress = async (req, res) => {
  const { id } = req.params;

  try {
    const landAddress = await LandAddress.findByPk(id);

    if (!landAddress) {
      return sendResponse(res, 404, null, 'Land address not found.');
    }

    await landAddress.destroy();
    sendResponse(res, 200, null, 'Land address deleted successfully.');
  } catch (err) {
    sendResponse(res, 500, null, 'An error occurred while deleting the land address: ' + err.message);
  }
};

// Fetch all land addresses by user ID
exports.getLandAddressesByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const landAddresses = await LandAddress.findAll({ where: { userId } });

    if (!landAddresses.length) {
      return sendResponse(res, 404, null, 'No land addresses found for this user.');
    }

    sendResponse(res, 200, landAddresses, 'Land addresses retrieved successfully.');
  } catch (err) {
    sendResponse(res, 500, null, 'An error occurred while fetching land addresses: ' + err.message);
  }
};