import React from 'react';
// import './App.css';
// import Grid from '@mui/material/Grid2'
// import RegisterUser from './components/RegisterUser';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { theme } from './theme';
import Layout from './components/Layout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Router>
          <Layout />
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}


// function App() {
//   return (
//     <Grid container spacing={5}>
//       <RegisterUser/>
//     </Grid>
//   );
// }

export default App;
