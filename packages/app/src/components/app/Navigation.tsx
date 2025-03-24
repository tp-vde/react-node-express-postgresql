import React, { useContext } from "react";
import { AppContext } from "./AppProvider";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AdminPanelSettings, Home, Person } from "@mui/icons-material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const drawerWidth = 224;
const collapsedDrawerWidth = 56;

const Navigation: React.FC = () => {
  const { isPinned, toggleSidebar } = useContext(AppContext);

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          overflow: "hidden",
          width: isPinned ? drawerWidth : collapsedDrawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            background: "#410c93",
            width: isPinned ? drawerWidth : collapsedDrawerWidth,
            boxSizing: "border-box",
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "hidden" }}>
          {/* Contenu du Drawer */}
          <List>
            <ListItem>
              <IconButton onClick={toggleSidebar}>
                <MenuIcon sx={{ color: "#FFF" }} />
              </IconButton>
            </ListItem>
            <Divider />
            <ListItem sx={{ color: "#FFF" }} component="a" href="/">
              <ListItemIcon>
                <Home sx={{ color: "#FFF" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem sx={{ color: "#FFF" }} component="a" href="/student">
              <ListItemIcon>
                <Person sx={{ color: "#FFF" }} />
              </ListItemIcon>
              <ListItemText primary="Students" />
            </ListItem>
            <ListItem component="a" href="/management">
              <ListItemIcon>
                <AdminPanelSettings sx={{ color: "#FFF" }} />
              </ListItemIcon>
              <ListItemText sx={{ color: "#FFF" }} primary="Management" />
            </ListItem>
            <ListItem sx={{ color: "#FFF" }} component="a" href="/admin">
              <ListItemIcon>
                <PersonAddAltIcon sx={{ color: "#FFF" }} />
              </ListItemIcon>
              <ListItemText primary="Admin" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navigation;
