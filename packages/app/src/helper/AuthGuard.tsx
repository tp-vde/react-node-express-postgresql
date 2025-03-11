
import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({children}: any) => {
  let logging = false;
// const token = await getAccessToken({email: "user2@example.com", password: "password123"});
  if (!logging) {
    return <Navigate to="/auth/login" />
  }
    return children;
   
};

export default AuthGuard;