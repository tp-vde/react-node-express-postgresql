import React from 'react';
import './App.css';
import Grid from '@mui/material/Grid2'
import DataDisplay from './components/VdeDataDisplay';
import RegisterUser from './components/RegisterUser';

function App() {
  return (
    <Grid container spacing={5}>
      <RegisterUser />
      <DataDisplay />
    </Grid>
  );
}

export default App;
