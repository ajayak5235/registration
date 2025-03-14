
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./utily/database') 
const userRoutes = require('./routers/userRoute');

const app = express();
app.use(bodyParser.json());
app.use(cors());



// Use user routes
app.use('/api', userRoutes);

connectDB()  // Connect to MongoDB

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});