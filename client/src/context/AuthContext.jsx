import React, { useState } from 'react';
import { AuthContext } from '../hooks/useAuth.jsx';

export const AuthProvider = ({ children }) => {
  // 1. Get initial state for token AND the user object
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))); // Parse the user object from its string form

  // 2. We can derive isAdmin from the user object
  const isAdmin = user ? user.isAdmin : false;

  // 3. Your login function already receives the full user object (res.data)
  //    from Login.jsx and Register.jsx, so this is perfect.
  const login = (userData) => {
    setToken(userData.token);
    setUser(userData); // Store the full user object in state

    // 4. Store them in localStorage
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData)); // Stringify the object for localStorage
  };

  const logout = () => {
    setToken(null);
    setUser(null);

    // 5. Clear everything
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin'); // This is old, but good to clean up
  };

  // 6. Pass the full user object to the context
  return (
    <AuthContext.Provider value={{ token, user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};