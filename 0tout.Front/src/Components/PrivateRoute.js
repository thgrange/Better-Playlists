import React, { useEffect } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import LoginService from '../Services/LoginService';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = LoginService.getToken();

  return (token ?
    <Outlet/> : //<Component {...props} />
    <Navigate to={{ pathname: '/login' }} /> //, state: { from: props.location }
  );
};

export default PrivateRoute;
