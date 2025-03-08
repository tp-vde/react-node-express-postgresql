import React from 'react';
import './App.css';
import Grid from '@mui/material/Grid2'
import RegisterUser from './components/RegisterUser';

function App() {
  return (
    <Grid container spacing={5}>
      <RegisterUser/>
    </Grid>
  );
}

export default App;
