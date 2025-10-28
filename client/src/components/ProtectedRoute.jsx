import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const ProtectedRoute = () => {
  const { token } = useAuth();

  // If a token exists, show the child component (e.g., <Profile />)
  // The <Outlet /> is a placeholder for the child component.
  // Otherwise, redirect the user to the /login page
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;