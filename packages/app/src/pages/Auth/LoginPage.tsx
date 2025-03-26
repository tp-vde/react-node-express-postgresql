import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { getAccessToken } from "../../api/CredentialsProvider";
import { useNavigate } from "react-router-dom";
import { accountSrevice } from "../../helper/accountSrevice";
import { IFormInput } from "../../api/types";
import { PageWithHeader } from "../../components/CustomPages";
import { Content } from "../../components/Root/Content";
import Grid from '@mui/material/Grid2';

import makeStyles from '@mui/styles/makeStyles';
import logo from '../../components/asset/logo-isoset.png'
  

const useStyles = makeStyles({
  png: {
    width: 'auto',
    height: '3rem',
    marginBottom: '1rem'
  },
});

const LogoIcon = () => {
  const classes = useStyles();

  return <img className={classes.png} src={logo} alt="Logo" />;
};


// Définir le schéma de validation avec Yup
const schema = yup.object({
  email: yup.string().email("Email invalide").required("Email requis"),
  password: yup.string().required("Mot de passe requis"),
});

const initialCredentials: IFormInput = {
  email: "",
  password: "",
};

const LoginPage: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const [credentials, setCredentials] =
    useState<IFormInput>(initialCredentials);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await getAccessToken(credentials);
      if (token) {
        accountSrevice.saveToken(token);
        navigate("/student");
      }
    } catch (error) {
      console.error("Error connect to students:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  return (
    <PageWithHeader title="VDE : Student Management">
      <Content>
      <Grid container 
           alignItems="center"
           color= '#FFFFFF'
           justifyContent="center"
            >
        <Paper elevation={5} sx={{ 
          display: "flex",
          flexDirection: 'column',
           justifyContent: "center",
           alignItems: "center",
           padding: 4, marginTop: 8, 
           width: "25rem"
           }}>

        <LogoIcon />
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            ISOSET
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="normal"
                  label="Email"
                  name="email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  onChange={handleChange}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="normal"
                  label="Mot de passe"
                  name="password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  onChange={handleChange}
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              color="primary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Se connecter
            </Button>
          </Box>
        </Paper>
        </Grid>
      </Content>
    </PageWithHeader>
  );
};

export default LoginPage;
