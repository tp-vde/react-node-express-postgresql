import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Alert,
} from '@mui/material';
import { getAccessToken } from '../api/CredentialsProvider';
import { useNavigate } from 'react-router-dom';


// Définir le schéma de validation avec Yup
const schema = yup.object({
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup.string().required('Mot de passe requis'),
});

// Définir le type des données du formulaire
export type IFormInput = {
  email: string;
  password: string;
};

const initialCredentials: IFormInput = {
  email: "",
  password: "",
};
const LoginForm: React.FC = () => {
  const {
    control,
    // handleSubmit, 
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const [token, setToken] = useState('');
  const [credentials, setCredentials] = useState<IFormInput>(initialCredentials);

  let navigate = useNavigate()
  
  const handleLogin = async () => {
    try {
      const token = await getAccessToken({email: "user2@example.com", password: "password123"});
      // setToken(token);
      if (token) {
        navigate('/admin', {replace: true})
      }
      console.log('response::', token)
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  // const onSubmit = async (e) => {
  //   e.preventDefault()
  //   await getAccessToken({email: "user2@example.com", password: "password123"})
  //       .then(res => {
  //           // Sauvegarde du token et envoi vers admin
  //           localStorage.setItem('token', token)
  //           navigate('/admin', {replace: true})
  //       })
  //       .catch(error => console.log(error))
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
    
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Connexion
        </Typography>
        {/* {error && <Alert severity="error">{error}</Alert>} */}
        <Box component="form" onSubmit={handleLogin}>
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
          {/* {errors.root && (
            <Alert severity="error">{errors.root.message}</Alert>
          )} */}
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;