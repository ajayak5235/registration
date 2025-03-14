// import { useState, useEffect } from "react";
// import axios from "axios";

// const URL = "http://localhost:5000";

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     country: "",
//     state: "",
//     city: "",
//     gender: "",
//     dob: "",
//     age: "",
//   });

//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [errors, setErrors] = useState({});

//   // Fetch countries on load
//   useEffect(() => {
//     axios
//       .get(`${URL}/api/locations/countries`)
//       .then((res) => setCountries(res.data || []))
//       .catch((error) => console.error("Error fetching countries:", error));
//   }, []);

//   // Fetch states when country changes
//   useEffect(() => {
//     if (formData.country) {
//       axios
//         .get(`${URL}/api/locations/states/${formData.country}`)
//         .then((res) => setStates(res.data || []))
//         .catch((error) => console.error("Error fetching states:", error));

//       setFormData((prev) => ({ ...prev, state: "", city: "" }));
//       setCities([]);
//     }
//   }, [formData.country]);

//   // Fetch cities when state changes
//   useEffect(() => {
//     if (formData.state) {
//       axios
//         .get(`${URL}/api/locations/cities/${formData.state}`)
//         .then((res) => setCities(res.data || []))
//         .catch((error) => console.error("Error fetching cities:", error));

//       setFormData((prev) => ({ ...prev, city: "" }));
//     }
//   }, [formData.state]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (name === "country") {
//       setFormData((prev) => ({ ...prev, state: "", city: "" }));
//       setStates([]);
//       setCities([]);
//     }

//     if (name === "state") {
//       setFormData((prev) => ({ ...prev, city: "" }));
//       setCities([]);
//     }

//     if (name === "dob") calculateAge(value);
//   };

//   const calculateAge = (dob) => {
//     const birthDate = new Date(dob);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     setFormData((prev) => ({ ...prev, age: age.toString() }));
//   };

//   const validateForm = () => {
//     let newErrors = {};
//     if (!/^[A-Za-z]+$/.test(formData.firstName)) newErrors.firstName = "Only alphabets allowed";
//     if (!/^[A-Za-z]+$/.test(formData.lastName)) newErrors.lastName = "Only alphabets allowed";
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
//     if (!formData.country) newErrors.country = "Select a country";
//     if (!formData.state) newErrors.state = "Select a state";
//     if (!formData.city) newErrors.city = "Select a city";
//     if (!formData.gender) newErrors.gender = "Select gender";
//     if (!formData.dob || formData.age < 14 || formData.age > 99) newErrors.dob = "Age must be 14-99 years";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log("Form Data:", formData);
//       axios
//         .post(`${URL}/api/users/register`, formData)
//         .then(() => alert("Registered Successfully"))
//         .catch((error) => console.error("Error registering user:", error));
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
//       {errors.firstName && <p>{errors.firstName}</p>}

//       <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
//       {errors.lastName && <p>{errors.lastName}</p>}

//       <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
//       {errors.email && <p>{errors.email}</p>}

//       <select name="country" value={formData.country} onChange={handleChange}>
//         <option value="">Select Country</option>
//         {countries.map((c) => (
//           <option key={c._id} value={c._id}>{c.name}</option>
//         ))}
//       </select>
//       {errors.country && <p>{errors.country}</p>}

//       <select name="state" value={formData.state} onChange={handleChange} disabled={!formData.country}>
//         <option value="">Select State</option>
//         {states.map((s) => (
//           <option key={s._id} value={s._id}>{s.name}</option>
//         ))}
//       </select>
//       {errors.state && <p>{errors.state}</p>}

//       <select name="city" value={formData.city} onChange={handleChange} disabled={!formData.state}>
//         <option value="">Select City</option>
//         {cities.map((c) => (
//           <option key={c._id} value={c._id}>{c.name}</option>
//         ))}
//       </select>
//       {errors.city && <p>{errors.city}</p>}

//       <select name="gender" value={formData.gender} onChange={handleChange}>
//         <option value="">Select Gender</option>
//         <option value="Male">Male</option>
//         <option value="Female">Female</option>
//       </select>
//       {errors.gender && <p>{errors.gender}</p>}

//       <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
//       {errors.dob && <p>{errors.dob}</p>}

//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default RegistrationForm;




// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextInput from './TextInput';
import Dropdown from './Dropdown';
import RadioButton from './RadioButton';
import DateInput from './DateInput';
import '../App.css';

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
      const response = await axios.get('https://registration-six-chi.vercel.app/api/countries');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchStates = async (country) => {
    try {
      const response = await axios.get(`https://registration-six-chi.vercel.app/api/states?country=${country}`);
      setStates(response.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCities = async (state) => {
    try {
      const response = await axios.get(`https://registration-six-chi.vercel.app/api/cities?state=${state}`);
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://registration-six-chi.vercel.app/api/users');
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
        await axios.post('https://registration-six-chi.vercel.app/api/register', formData);
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