import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  

  const handleLogout = async () => {
    await logout();
    navigate('/login'); 
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; 
  }
  
  return (
    <Grid container
    direction= 'row'   
    spacing={1}
    alignItems="center"
    color= '#FFFFFF'
     >
   <Typography >LOGOUT</Typography>
     <IconButton size="small"
     title="Logout"
     color="inherit"
     aria-label="logout"
     onClick={handleLogout}
     edge="start"
     sx={{ alignItems:'center', flexDirection:'row' }}
   >  
     <LogoutIcon />
   </IconButton>
   </Grid >
  );
};

export default LogoutButton;