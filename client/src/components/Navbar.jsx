import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx'; // <-- 1. Import from the new hooks file

const Navbar = () => {
  const navigate = useNavigate();
  // 2. Call the hook to get token and logout
  const { token, logout } = useAuth(); 

  const onLogout = () => {
    // 3. Use the logout function from the context
    logout(); 
    alert('Logged out');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Skill-Swap</Link>
      <div className="navbar-links">
        {/* This logic stays the same and now works! */}
        {token ? (
          <>
            <Link to="/profile">My Profile</Link>
            <button onClick={onLogout} className="logout-button">Logout</button>
          </>
        ) : (
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