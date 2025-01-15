import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({children}) => {
  const { user, loading } = useAuth();
  console.log("ProtectedRoute - User:", user, "Loading:", loading);

  if (loading) {
    return <div>Loading...</div>
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
