import { Navigate, Route } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const PrivateRoute = ({ children: Component, ...rest }) => {
  const { isAuthenticated } = useFetch();
  
  return (
    isAuthenticated ? 
      <Route {...rest} element={Component} /> 
      : 
      <Navigate to="/login" />
  );
};

export default PrivateRoute;
