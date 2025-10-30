import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const AdminRoute = () => {
  // Get both token and isAdmin from your hook
  const { token, isAdmin } = useAuth();

  // User must have a token AND be an admin
  return token && isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;