// client/src/pages/Register.jsx

import React, { useState } from 'react'; // Import useState
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // Import for redirecting

const Register = () => {
  // 1. STATE: Use state to keep track of what the user is typing
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // useNavigate hook to redirect after login
  const navigate = useNavigate();

  // Destructure for easier access in the form
  const { name, email, password } = formData;

  // 2. ONCHANGE HANDLER: A single function to update the state for any form field
  const onChange = (e) => {
    // e.target.name will be "name", "email", or "password"
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. ONSUBMIT HANDLER: Function to run when the form is submitted
  const onSubmit = async (e) => {
    e.preventDefault(); // Stop the form from reloading the page
    
    // This is the new user object we'll send to the API
    const newUser = {
      name,
      email,
      password,
    };

    try {
      // 4. API CALL: Use axios to send a POST request
      const res = await axios.post(
        'http://localhost:5000/api/users/register', // Your API URL
        newUser // The data we're sending
      );

      // The server sends back the user data and token
      console.log(res.data);

      // 5. SUCCESS: Save the token to localStorage
      localStorage.setItem('token', res.data.token);

      // Show a success message and redirect to the homepage
      alert('Registration successful!');
      navigate('/'); // Redirect to home

    } catch (err) {
      // 6. ERROR: If the server sends an error (e.g., "User already exists")
      // Thanks to our middleware, the error is in err.response.data.message
      console.error(err.response.data.message);
      alert('Error: ' + err.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {/* 3. Link the form to the onSubmit handler */}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name" // This MUST match the state key
            value={name} // 1. Link to state
            onChange={onChange} // 2. Link to handler
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email" // This MUST match the state key
            value={email} // 1. Link to state
            onChange={onChange} // 2. Link to handler
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password" // This MUST match the state key
            value={password} // 1. Link to state
            onChange={onChange} // 2. Link to handler
            required
            minLength="6"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;