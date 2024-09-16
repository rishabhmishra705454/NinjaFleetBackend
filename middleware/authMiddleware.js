const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwtConfig');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from Authorization header

  if (token == null) return res.sendStatus(401); // If no token is provided

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403); // If token is invalid or expired

    req.user = user;
    next(); // Pass the user object to the next middleware/handler
  });
};

module.exports = authenticateToken;
