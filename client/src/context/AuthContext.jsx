// client/src/context/AuthContext.jsx

import React, { useState, useEffect } from 'react';
// 1. Import the context from your hook file
import { AuthContext } from '../hooks/useAuth.jsx'; 

// 2. DELETE this line: export const AuthContext = createContext(null);

// This file now ONLY exports a component, which makes Vite happy.
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  // This line works perfectly because AuthContext is imported
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};