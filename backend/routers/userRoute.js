
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Fetch countries
router.get('/countries', userController.getCountries);

// Fetch states
router.get('/states', userController.getStates);

// Fetch cities
router.get('/cities', userController.getCities);

// Save registration data
router.post('/register', userController.registerUser);
//get all users
router.get('/users', userController.getAllUsers);

module.exports = router;