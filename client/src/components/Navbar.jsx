import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import SkillsLogo from '../assets/skills_logo.png';

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
      {/* 2. Replace text with an <img> tag */}
      <Link to="/" className="navbar-brand">
        <img src={SkillsLogo} alt="Skill-Swap Logo" className="navbar-logo" />
        {/* You can keep text here if you want it next to the logo: */}
        {<span>Skill-Swap</span>} 
      </Link>
      <div className="navbar-links">
        {token ? (
          <>
            <Link to="/create-skill">Post Skill</Link>
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