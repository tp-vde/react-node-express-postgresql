import React, { useState } from "react";
import * as yup from "yup";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PageWithHeader } from "../../components/CustomPages";
import { Content } from "../../components/Root/Content";
import Grid from "@mui/material/Grid2";
import makeStyles from "@mui/styles/makeStyles";
import logo from "../../components/asset/logo-isoset.png";
import { useAuth } from "../../components/CustomPages/AuthContext";
import { IFormInput } from "../../api/types";

const useStyles = makeStyles({
  png: {
    width: "auto",
    height: "3rem",
    marginBottom: "1rem",
  },
});

const LogoIcon = () => {
  const classes = useStyles();
  return <img className={classes.png} src={logo} alt="Logo" />;
};


interface FormErrors {
  email?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState<IFormInput>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!credentials.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "L'email est invalide";
    }

    if (!credentials.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (credentials.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (loginSuccess) {
    navigate("/student");
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await login(credentials);
        setLoginSuccess(isAuthenticated);
      } catch (error) {
        console.error("Erreur de connexion:", error);
        setErrors({
          ...errors,
          password: "Email ou mot de passe incorrect",
        });
      } finally {
        setIsSubmitting(false);
      }
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
        <Grid
          container
          alignItems="center"
          color="#FFFFFF"
          justifyContent="center"
        >
          <Paper
            elevation={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 4,
              marginTop: 8,
              width: "25rem",
            }}
          >
            <LogoIcon />
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              ISOSET
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                type="email"
                error={!!errors.email}
                helperText={errors.email && errors.email}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Mot de passe"
                name="password"
                type="password"
                error={!!errors.password}
                helperText={errors.password && errors.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                color="primary"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
              </Button>

              <div className="mt-4 text-center text-sm text-gray-600">
                <p>
                  Pas encore de compte ?{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Faire une demande
                  </a>
                </p>
                <p className="mt-1">
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Mot de passe oublié ?
                  </a>
                </p>
              </div>
            </Box>
          </Paper>
        </Grid>
      </Content>
    </PageWithHeader>
  );
};

export default LoginPage;
