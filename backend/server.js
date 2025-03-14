const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./utily/database');
const userRoutes = require('./routers/userRoute');

const app = express();

// Configure CORS
// const corsOptions = {
//   origin: 'https://registration-sc77.vercel.app', // Allow requests from this origin
//   methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
//   credentials: true, // Allow cookies and credentials
// };
const corsOptions = {
  origin: '*', // Allow requests from any origin
};
app.use(cors(corsOptions)); // Use CORS with the specified options
app.use(bodyParser.json());

// Use user routes
app.use('/api', userRoutes);

connectDB(); // Connect to MongoDB

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
