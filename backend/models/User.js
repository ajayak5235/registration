
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    match: /^[A-Za-z]+$/, // Alphabets only
  },
  lastName: {
    type: String,
    required: true,
    match: /^[A-Za-z]+$/, // Alphabets only
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Valid email format
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'], // Only these values are allowed
  },
  dob: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        const age = new Date().getFullYear() - new Date(value).getFullYear();
        return age >= 14 && age <= 99; // Age must be between 14 and 99
      },
      message: 'Age must be between 14 and 99 years.',
    },
  },
  age: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;