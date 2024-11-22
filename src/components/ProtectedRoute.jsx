// ProtectedRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

  const {token } = useSelector((state) => state.users);

  const isLoggedIn = !!token; // Verifica si hay un token

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
