import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // 1. Remove "name" from the state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // 1. Remove "name" from destructuring
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Remove "name" from the object being sent
    const userToLogin = {
      email,
      password,
    };

    try {
      // 2. Change the API endpoint to '/login'
      const res = await axios.post(
        'http://localhost:5000/api/users/login', // <-- CHANGED
        userToLogin
      );

      // We get back the user data and token
      console.log(res.data);

      // Save the token to localStorage
      localStorage.setItem('token', res.data.token);

      // 3. Update the alert message
      alert('Login successful!'); // <-- CHANGED
      navigate('/'); // Redirect to home

    } catch (err) {
      // If the server sends an error (e.g., "Invalid email or password")
      console.error(err.response.data.message);
      alert('Error: ' + err.response.data.message);
    }
  };

  return (
    // The styling is identical because we use the same class names
    <div className="form-container">
      {/* 3. Update the title */}
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        
        {/* 1. Remove the "name" form-group */}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email" 
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password" 
            value={password}
            onChange={onChange}
            required
          />
        </div>
        {/* 3. Update the button text */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;