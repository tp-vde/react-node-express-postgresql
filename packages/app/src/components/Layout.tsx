import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Home, Person, AdminPanelSettings, Menu as MenuIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import AdminPage from '../pages/AdminPage';
import RegisterUser from '../pages/RegisterUser';
import HomePage from '../pages/HomePage';
import AuthRouter from '../pages/Auth/AuthRouter';
import AuthGuard from '../helper/AuthGuard';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: `-${drawerWidth}px`,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Layout() {
  const [open, setOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Student Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem component="a" href="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component="a" href="/registration">
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Registration" />
          </ListItem>
          <ListItem component="a" href="/admin">
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary="Admin" />
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<RegisterUser />} />
          <Route path="/admin" element={
            <AuthGuard>
              <AdminPage />
            </AuthGuard>
          } />
          <Route path="/auth/*" element={<AuthRouter />} />
        </Routes>
      </Main>
    </Box>
  );
};

// function App() {
//   const [token, setToken] = useState('');
//   const [message, setMessage] = useState('');

//   const handleLogin = async () => {
//     const response = await fetch('http://localhost:5000/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username: 'admin', password: 'password' }),
//     });
//     const data = await response.json();
//     setToken(data.token);
//   };

//   const fetchProtectedData = async () => {
//     const response = await fetch('http://localhost:5000/protected', {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await response.json();
//     setMessage(data.message);
//   };

//   return (
//     <div>
//       <button onClick={handleLogin}>Se connecter</button>
//       <button onClick={fetchProtectedData}>Accéder à la route protégée</button>
//       <p>{message}</p>
//     </div>
//   );
// }