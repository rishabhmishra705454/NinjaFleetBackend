const sequelize = require("../config/sequelize"); // Your Sequelize config
const Admin = require("../models/admin");

async function seedAdmin() {
  try {
    // Check if the admin account already exists
    const existingAdmin = await Admin.findOne({ where: { email: 'admin@example.com' } });
    
    if (!existingAdmin) {
      // Create admin if not found
      await Admin.create({
        fullName: 'Admin User',
        email: 'admin@example.com',
        password: '12345678', // This will be hashed by the `beforeCreate` hook
      });

      console.log('Admin user created successfully.');
    } else {
      console.log('Admin user already exists.');
    }
  } catch (err) {
    console.error('Error seeding admin:', err.message);
  } finally {
    // Optionally, close the sequelize connection after seeding
    await sequelize.close();
  }
}

// Call the seed function
seedAdmin();
