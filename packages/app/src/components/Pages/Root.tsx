import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppProvider';
import Navigation from './Navigation';

import SettingsPage from './SettingsPage';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import LoginPage from '../../pages/Auth/LoginPage';
import StudentPage from '../../pages/StudentPage';
import AuthProvider from '../../helper/AuthProvider';
import AdminPage from '../../pages/AdminPage';
import AuthRouter from '../../pages/Auth/AuthRouter';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { lightTheme } from '../../theme';
import HomePage from '../../pages/HomePage';
import UserPage from '../../pages/UserPage';

const Root: React.FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Router>
      <AppProvider>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <Navigation />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              transition: 'margin 0.3s ease',
            }}
          >
         <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/student"
            element={
              <AuthProvider>
                <StudentPage />
              </AuthProvider>
            }
          />
          <Route
            path="/admin"
            element={
              <AuthProvider>
                <AdminPage />
              </AuthProvider>
            }
          />
          <Route
            path="/users"
            element={
              <AuthProvider>
                <UserPage />
              </AuthProvider>
            }
          />
          <Route path="/auth/*" element={<AuthRouter />} />
        </Routes>
          </Box>
        </Box>
      </AppProvider>
    </Router>
    </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Root;