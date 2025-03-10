import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

export default function HomePage() {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Système de gestion des étudiants du Village De l'Emploi (VDE)
        </Typography>
        <Typography variant="body1" component="span" >
          Ce système permet de gérer les inscriptions des étudiants et les tâches administratives.
        </Typography>
      </Paper>
    </Container>
  );
}