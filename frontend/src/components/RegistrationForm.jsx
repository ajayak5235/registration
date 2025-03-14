
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextInput from './TextInput';
import Dropdown from './Dropdown';
import RadioButton from './RadioButton';
import DateInput from './DateInput';
import '../App.css';
const Base_URL = "https://registration-iota-nine.vercel.app"

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    dob: '',
    age: '',
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchCountries();
    fetchUsers();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://registration-iota-nine.vercel.app/api/countries');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchStates = async (country) => {
    try {
      const response = await axios.get(`https://registration-iota-nine.vercel.app/api/states?country=${country}`);
      setStates(response.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCities = async (state) => {
    try {
      const response = await axios.get(`https://registration-iota-nine.vercel.app/api/cities?state=${state}`);
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://registration-iota-nine.vercel.app/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'country') {
      setStates([]);
      setCities([]);
      fetchStates(value);
    } else if (name === 'state') {
      setCities([]);
      fetchCities(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post('https://registration-iota-nine.vercel.app/api/register', formData);
        alert('Registration successful!');
        fetchUsers(); // Refresh the user list after registration
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.match(/^[A-Za-z]+$/)) errors.firstName = 'Invalid first name';
    if (!formData.lastName.match(/^[A-Za-z]+$/)) errors.lastName = 'Invalid last name';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = 'Invalid email';
    if (!formData.country) errors.country = 'Country is required';
    if (!formData.state) errors.state = 'State is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.gender) errors.gender = 'Gender is required';
    if (!formData.dob) errors.dob = 'Date of birth is required';
    return errors;
  };

  return (
    <div className="app-container">
        <h3>Registration Form</h3>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-row">
          <TextInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />
          <TextInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />
          <TextInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>
        <div className="form-row">
          <Dropdown
            label="Country"
            name="country"
            value={formData.country}
            options={countries}
            onChange={handleChange}
            error={errors.country}
          />
          <Dropdown
            label="State"
            name="state"
            value={formData.state}
            options={states}
            onChange={handleChange}
            error={errors.state}
          />
          <Dropdown
            label="City"
            name="city"
            value={formData.city}
            options={cities}
            onChange={handleChange}
            error={errors.city}
          />
        </div>
        <div className="form-row">
          <RadioButton
            label="Gender"
            name="gender"
            value={formData.gender}
            options={['Male', 'Female', 'Other']}
            onChange={handleChange}
            error={errors.gender}
          />
          <DateInput
            label="Date of Birth"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            error={errors.dob}
          />
        </div>
        <button type="submit" style={{backgroundColor:"green", color:"white"}}>Submit</button>
      </form>

      <div className="user-list">
        <h2>Registered Users</h2>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.country}</td>
                <td>{user.state}</td>
                <td>{user.city}</td>
                <td>{user.gender}</td>
                <td>{new Date(user.dob).toLocaleDateString()}</td>
                <td>{user.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default RegistrationForm;
