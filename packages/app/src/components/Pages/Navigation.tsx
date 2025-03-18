import React, { useContext } from 'react';
import { AppContext } from './AppProvider';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { AdminPanelSettings, Home, Person } from '@mui/icons-material';
import LogoutIcon from "@mui/icons-material/Logout";
import { accountSrevice } from '../../helper/accountSrevice';
import { useNavigate } from 'react-router-dom';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const Navigation: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useContext(AppContext);



  const navigate = useNavigate();
    const logout = () => {
      accountSrevice.logout();
      navigate("/");
    };
    
  return (
    <>
      <AppBar
        position="fixed"
        sx={{  zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleSidebar}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Student Management System
          </Typography>

          <IconButton 
            color="inherit"
            aria-label="open drawer"
            onClick={logout}
            edge="start"
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={isSidebarOpen}
        sx={{
          width: isSidebarOpen ? 240 : 56,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isSidebarOpen ? 240 : 56,
            boxSizing: 'border-box',
            transition: 'width 0.3s ease',
          },
        }}
      >
        <List>
          <ListItem>
            <IconButton onClick={toggleSidebar}>
              <MenuIcon />
            </IconButton>
          </ListItem>
          <Divider />
          <ListItem component="a" href="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component="a" href="/student">
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Students" />
          </ListItem>
          <ListItem component="a" href="/admin">
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary="Admin" />
          </ListItem>
          <ListItem component="a" href="/users">
            <ListItemIcon>
              <PersonAddAltIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navigation;