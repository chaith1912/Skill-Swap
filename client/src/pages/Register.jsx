import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { login } = useAuth(); // <-- 2. Call the hook to get the login function

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault(); 
    
    const newUser = {
      name,
      email,
      password,
    };

    try {
      const res = await axios.post(
        'http://localhost:5000/api/users/register', 
        newUser
      );

      console.log(res.data);

      // 3. Use the login function from the context
      login(res.data.token); 

      alert('Registration successful!');
      navigate('/'); 

    } catch (err) {
      console.error(err.response.data.message);
      alert('Error: ' + err.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name" 
            value={name} 
            onChange={onChange} 
            required
          />
        </div>
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
            minLength="6"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;