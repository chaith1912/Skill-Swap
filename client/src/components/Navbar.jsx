import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const onLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Skill-Swap</Link>
      <div className="navbar-links">
        {token ? (
          // If user IS logged in
          <>
            <Link to="/profile">My Profile</Link>
            <button onClick={onLogout} className="logout-button">Logout</button>
          </>
        ) : (
          // If user IS NOT logged in
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;