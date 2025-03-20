import React, { useContext } from 'react';
import { AppContext } from './AppProvider';
import {
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
      {/* <AppBar
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
      </AppBar> */}

      <Drawer
        variant="permanent"
        open={isSidebarOpen}
        sx={{
          width: isSidebarOpen ? 224 : 56,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            background: '#410c93',
            width: isSidebarOpen ? 224 : 56,
            boxSizing: 'border-box',
            transition: 'width 200ms cubic-bezier(0.4, 0, 0.6, 1)',
          },
        }}
      >
        <List>
          <ListItem>
            <IconButton onClick={toggleSidebar}>
              <MenuIcon sx={{color: '#FFF'}} />
            </IconButton>
          </ListItem>
          <Divider />
          <ListItem sx={{color: '#FFF'}} component="a" href="/">
            <ListItemIcon>
              <Home  sx={{color: '#FFF'}} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem sx={{color: '#FFF'}} component="a" href="/student">
            <ListItemIcon>
              <Person sx={{color: '#FFF'}}/>
            </ListItemIcon>
            <ListItemText primary="Students" />
          </ListItem>
          <ListItem component="a" href="/management">
            <ListItemIcon>
              <AdminPanelSettings sx={{color: '#FFF'}}/>
            </ListItemIcon>
            <ListItemText sx={{color: '#FFF'}} primary="Management" />
          </ListItem>
          <ListItem sx={{color: '#FFF'}} component="a" href="/admin">
            <ListItemIcon>
              <PersonAddAltIcon sx={{color: '#FFF'}}/>
            </ListItemIcon>
            <ListItemText primary="Admin" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navigation;