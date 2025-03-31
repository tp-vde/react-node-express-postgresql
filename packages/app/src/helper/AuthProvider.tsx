
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { accountSrevice } from './accountSrevice';

const AuthProvider = () => {
    return (!accountSrevice.isLogged() || accountSrevice.isExpired()) 
    ? <Navigate to="/login" replace />
    : <Outlet />;
};

export default AuthProvider;