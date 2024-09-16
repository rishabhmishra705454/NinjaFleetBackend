/**
 * Format API responses.
 * @param {Object} res - The Express response object.
 * @param {number} statusCode - The HTTP status code.
 * @param {Object} data - The data to send in the response.
 * @param {string} [message] - Optional message to include in the response.
 */
const sendResponse = (res, statusCode, data, message = '') => {
    res.status(statusCode).json({
      success: statusCode >= 200 && statusCode < 300,
      message,
      data
    });
  };
  
  module.exports = sendResponse;
  