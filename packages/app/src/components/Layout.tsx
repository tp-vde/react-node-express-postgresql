import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
  Button,
} from "@mui/material";
import {
  Home,
  Person,
  AdminPanelSettings,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import StudentPage from "../pages/StudentPage";
import AdminPage from "../pages/AdminPage";
import HomePage from "../pages/HomePage";
import AuthRouter from "../pages/Auth/AuthRouter";
import AuthProvider from "../helper/AuthProvider";
import LogoutIcon from "@mui/icons-material/Logout";
import { accountSrevice } from "../helper/accountSrevice";

const drawerWidth = 200;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: `-${drawerWidth}px`,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 0,
    transition: theme.transitions.create("margin", {
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

  const navigate = useNavigate();

  const logout = () => {
    accountSrevice.logout();
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
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
          <Button color="info" onClick={logout}>
            Logout
          </Button>
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
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
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
        </List>
      </Drawer>
      <Main open={open}>
        <Toolbar />
        <Routes>
          {/* <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route
            path="/student"
            element={
              <AuthProvider>
                <StudentPage />
              </AuthProvider>
            }
          />
          <Route
            path="/admin"
            element={
              <AuthProvider>
                <AdminPage />
              </AuthProvider>
            }
          />
          <Route path="/auth/*" element={<AuthRouter />} />
        </Routes>
      </Main>
    </Box>
  );
};