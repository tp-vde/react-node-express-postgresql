import React, { useContext, useState } from "react";
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
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AdminPanelSettings, Home, Person } from "@mui/icons-material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";



const drawerWidthClosed = 72;
const drawerWidthOpen= 224;

const Navigation: React.FC = () => {
  const { isPinned, toggleSidebar } = useContext(AppContext);
  const [activeItem, setActiveItem] = useState("Home");

  const theme = useTheme();

  const navigate = useNavigate();

  const menuItems = [
    {
      text: "Home",
      path: "/",
      icon: <Home />,
    },
    {
      text: "Students",
      path: "/student",
      icon: <Person />,
    },
    {
      text: "Management",
      path: "/management",
      icon: (
        <AdminPanelSettings />
      ),
    },
    {
      text: "Admin",
      path: "/admin",
      icon: (
        <PersonAddAltIcon />
      ),
    },
  ];


  const handleItemClick = (text: string, path: string) => {
    setActiveItem(text);
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        open={isPinned}
        sx={{
          overflow: "hidden",
          width: isPinned
            ? drawerWidthOpen
            : drawerWidthClosed,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            display: "flex",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            background: "#410c93",
            overflowX: "hidden",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            width: isPinned
              ? drawerWidthOpen
              : drawerWidthClosed,
            boxSizing: "border-box",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            ...(!isPinned && {
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            }),
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "hidden" }}>
          <List>
            <ListItem>
              <IconButton onClick={toggleSidebar}>
                <MenuIcon sx={{ color: "#FFF" }} />
              </IconButton>
            </ListItem>
            <Divider />

            {menuItems.map((item) => (
              <ListItem
                key={item.path}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  selected={activeItem === item.text}
                  onClick={() => handleItemClick(item.text, item.path)}
                  sx={{
                    backgroundColor: "inherit",
                    "&.Mui-selected": {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      "& .MuiListItemIcon-root": {
                        color: theme.palette.primary.contrastText,
                      },
                    },
                    "&:not(.Mui-selected):hover": {
                      backgroundColor: "#404040",
                      "& .MuiListItemIcon-root": {
                        color: theme.palette.primary.main,
                      },
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "#404040",
                    },
                    color: activeItem === item.text ? "#FFF" : "#b5b5b5",
                    borderLeft:
                      activeItem === item.text ? `solid 3px #9BF0E1` : "none",
                  }}
                >
                  <ListItemIcon><span style={{ color: activeItem ? "#FFF" : "#b5b5b5" }}>{item.icon}</span></ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navigation;
