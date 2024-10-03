const Booking = require('../models/booking');
const sendResponse = require('../utils/responseFormatter');

// Create a new booking
exports.createBooking = async (req, res) => {
  const { userId, machineryId, providerId, landCoordinates, landArea, startDate, endDate ,totalAmount} = req.body;

  try {
    const newBooking = await Booking.create({
      userId,
      machineryId,
      providerId,
      landCoordinates,
      landArea,
      startDate,
      totalAmount,
      endDate,
      status: 'Pending', // Default status on creation
    });

    sendResponse(res, 201, newBooking, 'Booking created successfully.');
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const messages = err.errors.map(e => e.message).join(', ');
      return sendResponse(res, 400, null, `Validation error: ${messages}`);
    }
    return sendResponse(res, 500, null, 'An error occurred while creating the booking: ' + err.message);
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findOne({ where: { id } });

    if (!booking) {
      return sendResponse(res, 404, null, 'Booking not found.');
    }

    sendResponse(res, 200, booking, 'Booking details fetched successfully.');
  } catch (err) {
    return sendResponse(res, 500, null, 'An error occurred while fetching booking details: ' + err.message);
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findOne({ where: { id } });

    if (!booking) {
      return sendResponse(res, 404, null, 'Booking not found.');
    }

    // Update booking status
    booking.status = status;
    await booking.save();

    sendResponse(res, 200, booking, 'Booking status updated successfully.');
  } catch (err) {
    return sendResponse(res, 500, null, 'An error occurred while updating the booking: ' + err.message);
  }
};

// Delete booking by ID
exports.deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findOne({ where: { id } });

    if (!booking) {
      return sendResponse(res, 404, null, 'Booking not found.');
    }

    await booking.destroy(); // Delete the booking record
    sendResponse(res, 200, null, 'Booking deleted successfully.');
  } catch (err) {
    return sendResponse(res, 500, null, 'An error occurred while deleting the booking: ' + err.message);
  }
};

// Get all bookings by user ID
exports.getBookingsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await Booking.findAll({ where: { userId } });

    if (!bookings.length) {
      return sendResponse(res, 404, null, 'No bookings found for this user.');
    }

    sendResponse(res, 200, bookings, 'Bookings fetched successfully.');
  } catch (err) {
    return sendResponse(res, 500, null, 'An error occurred while fetching bookings: ' + err.message);
  }
};

// Get all bookings with query filters (pagination, sorting, filtering)
exports.getAllBookings = async (req, res) => {
  const { page = 1, limit = 10, sort = 'createdAt', order = 'DESC', status } = req.query;

  try {
    const queryOptions = {
      limit: parseInt(limit), // Limit the number of results per page
      offset: (parseInt(page) - 1) * parseInt(limit), // Skip for pagination
      order: [[sort, order.toUpperCase()]], // Sorting
    };

    // Adding additional filters (like status)
    const whereClause = {};
    if (status) whereClause.status = status;

    // Add filters to query options
    queryOptions.where = whereClause;

    // Fetch bookings with query filters
    const { rows: bookings, count: total } = await Booking.findAndCountAll(queryOptions);

    if (!bookings.length) {
      return sendResponse(res, 404, null, 'No bookings found.');
    }

    // Return paginated result
    const totalPages = Math.ceil(total / limit);
    const result = {
      bookings,
      pagination: {
        totalItems: total,
        currentPage: parseInt(page),
        totalPages,
        itemsPerPage: parseInt(limit),
      },
    };

    sendResponse(res, 200, result, 'Bookings fetched successfully.');
  } catch (err) {
    return sendResponse(res, 500, null, 'An error occurred while fetching bookings: ' + err.message);
  }
};
