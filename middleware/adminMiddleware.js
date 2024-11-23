const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwtConfig');

const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' }); // If no token is provided
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Unauthorized! JWT malformed' }); // If token is invalid or expired
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    req.user = user;
    next();
  });
};

module.exports = verifyAdminToken;