const multer = require('multer');
const path = require('path');

// Set up multer for multiple file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Save files with unique names
  }
});

// Use 'aadharFront' and 'aadharBack' as field names for the Aadhaar front and back images
const upload = multer({ storage: storage });

module.exports = upload;
