
const { countries, states, cities } = require('../data/countriesStatesCities');
const User = require('../models/User');

// Fetch countries
const getCountries = (req, res) => {
  res.json(countries);
};

// Fetch states
const getStates = (req, res) => {
  const country = req.query.country;
  res.json(states[country] || []);
};

// Fetch cities
const getCities = (req, res) => {
  const state = req.query.state;
  res.json(cities[state] || []);
};

// Save registration data
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, country, state, city, gender, dob } = req.body;

    // Calculate age
    const age = new Date().getFullYear() - new Date(dob).getFullYear();

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      email,
      country,
      state,
      city,
      gender,
      dob,
      age,
    });

    // Save the user to the database
    await user.save();

    res.json({ message: 'Registration successful!', data: user });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
};

// Fetch all users
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
};

module.exports = {
  getCountries,
  getStates,
  getCities,
  registerUser,
  getAllUsers,
};