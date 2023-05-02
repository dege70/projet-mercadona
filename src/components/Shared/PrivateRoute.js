import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const PrivateRoute = ({ children: Component, ...rest }) => {
  const { isAuthenticated } = useFetch();

  return isAuthenticated ? (
    <Route {...rest} element={Component} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
