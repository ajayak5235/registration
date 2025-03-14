
// const express = require('express');
// require('dotenv').config();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const connectDB = require('./utily/database') 
// const userRoutes = require('./routers/userRoute');

// const app = express();
// app.use(bodyParser.json());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://reg-frontend-three.vercel.app"); // Allow frontend domain
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

// app.use(cors({
//   origin: '*',
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type,Authorization'
// }));




// // Use user routes
// app.use('/api', userRoutes);

// connectDB()  // Connect to MongoDB

// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./utily/database'); 
const userRoutes = require('./routers/userRoute');

const app = express();
app.use(bodyParser.json());

// CORS Middleware (Set specific frontend domain)
app.use(cors({
  origin: 'https://reg-frontend-three.vercel.app', // Allow only frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests (OPTIONS method)
app.options('*', (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://reg-frontend-three.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

// Use user routes
app.use('/api', userRoutes);

// Connect to MongoDB
connectDB();  

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

