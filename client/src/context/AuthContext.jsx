import React, { useState} from 'react';
import { AuthContext } from '../hooks/useAuth.jsx';

export const AuthProvider = ({ children }) => {
  // 1. Get initial state for token AND isAdmin from localStorage
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true'); // Check if the string 'true' exists

  // 2. This login function now accepts the whole data object
  const login = (data) => {
    setToken(data.token);
    setIsAdmin(data.isAdmin);

    // 3. Store both in localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('isAdmin', data.isAdmin);
  };

  const logout = () => {
    setToken(null);
    setIsAdmin(false);

    // 4. Clear both from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
  };

  // 5. Add isAdmin to the context's value
  return (
    <AuthContext.Provider value={{ token, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};