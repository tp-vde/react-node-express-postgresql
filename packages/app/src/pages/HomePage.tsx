import React from "react";
import { Typography, Paper } from "@mui/material";
import { Content } from "../components/app/Content";
import { PageWithHeader } from "../components/CustomPages";


export default function HomePage() {
  return (
    <PageWithHeader title='VDE' >
    <Content>
        <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Système de gestion des étudiants du Village De l'Emploi (VDE)
          </Typography>
          <Typography variant="body1" component="span">
            Ce système permet de gérer les inscriptions des étudiants et les
            tâches administratives.
          </Typography>
        </Paper> 
    </Content>
    </PageWithHeader>
  );
}
