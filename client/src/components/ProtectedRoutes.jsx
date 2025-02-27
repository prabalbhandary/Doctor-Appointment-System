import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default ProtectedRoutes;
