const express = require('express');
const sequelize = require('./config/sequelize');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const providerRoutes = require('./routes/providerRoutes');
const machinaryRoutes = require('./routes/machinaryRoutes');

const app = express();
const port = 8080;
const cors = require('cors');
app.use(cors());
app.use(express.json());
// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Use routes
app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api',providerRoutes);
app.use('/api',machinaryRoutes);

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});
sequelize.sync({ force: true });

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});