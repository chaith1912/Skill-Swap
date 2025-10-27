import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx'; // <-- 1. Import from the new hooks file

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { login } = useAuth(); // <-- 2. Call the hook

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const userToLogin = {
      email,
      password,
    };

    try {
      const res = await axios.post(
        'http://localhost:5000/api/users/login',
        userToLogin
      );

      console.log(res.data);

      // 3. Use the login function from the context
      login(res.data.token); 

      alert('Login successful!');
      navigate('/'); 

    } catch (err) {
      console.error(err.response.data.message);
      alert('Error: ' + err.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;