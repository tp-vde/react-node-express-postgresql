import React from 'react';
import './App.css';
import Grid from '@mui/material/Grid2'
// import DataDisplay from './components/VdeDataDisplay';
// import RegisterUser from './components/RegisterUser';
import Example from './components/core/TS';
function App() {
  return (
    <Grid container spacing={5}>
      <Example />
      {/* <RegisterUser />
      <DataDisplay /> */}
    </Grid>
  );
}

export default App;
