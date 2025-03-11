

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from '../LoginForm';

const AuthRouter = () => {
    return (
        <Routes>
            <Route index element={<LoginForm />} />
            <Route path='login' element={<LoginForm />} />
            <Route path='*' element={<>Erreur</>} />
        </Routes>
    );
};

export default AuthRouter;