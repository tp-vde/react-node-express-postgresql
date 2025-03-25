import Root from './components/app/Root';
import { AppProvider } from './components/app/AppProvider';
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { lightTheme } from "./theme";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LoginPage from "./pages/Auth/LoginPage";
import StudentPage from "./pages/StudentPage";
import HomePage from "./pages/HomePage";
import AuthProvider from "./helper/AuthProvider";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import AuthRouter from "./pages/Auth/AuthRouter";


const routes = (
  <ThemeProvider theme={lightTheme}>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route element={<AuthProvider />}>
          <Route path="/student" element={<StudentPage />} />
          <Route path="/management" element={<AdminPage />} />
          <Route path="/admin" element={<UserPage />} />
        </Route>
        <Route path="/auth/*" element={<AuthRouter />} />
      </Routes>
</LocalizationProvider>
</ThemeProvider>
);


const App = () => (
  <AppProvider>
    <Root>{routes}</Root>
  </AppProvider>
);

export default App;
