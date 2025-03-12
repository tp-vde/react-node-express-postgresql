
import React from 'react';
import { Navigate } from 'react-router-dom';
import { accountSrevice } from './accountSrevice';

const AuthProvider = ({children}: any) => {
  if (!accountSrevice.isLogged()) {
    return <Navigate to="/auth/login" />
  }
    return children;
};

export default AuthProvider;