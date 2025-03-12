

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';

const AuthRouter = () => {
    return (
        <Routes>
            <Route index element={<LoginPage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='*' element={<>Erreur</>} />
        </Routes>
    );
};

export default AuthRouter;