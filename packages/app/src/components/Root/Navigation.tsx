import React, { useContext, useRef, useState } from "react";
import { AppContext } from "./AppProvider";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
import { drawerWidthClosed, drawerWidthOpen } from "./LogoIcon";
import SidebarLogo from "./LogoIcon";

enum State {
  Closed,
  Idle,
  Open,
}

const Navigation: React.FC = () => {
  const { isPinned, toggleSidebar } = useContext(AppContext);
  const [activeItem, setActiveItem] = useState("Home");

  const [state, setState] = useState(State.Closed);
  const hoverTimerRef = useRef<number>(undefined);

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
      icon: <AdminPanelSettings />,
    },
    {
      text: "Admin",
      path: "/admin",
      icon: <PersonAddAltIcon />,
    },
  ];

  const handleItemClick = (text: string, path: string) => {
    setActiveItem(text);
    navigate(path);
  };

  const handleOpen = () => {
    if (isPinned) {
      return;
    }
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = undefined;
    }

    if (state !== State.Open) {
      hoverTimerRef.current = window.setTimeout(() => {
        hoverTimerRef.current = undefined;
        setState(State.Open);
      }, 10);

      setState(State.Idle);
    }
  };

  const handleClose = () => {
    if (isPinned) {
      return;
    }
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = undefined;
    }
    if (state === State.Idle) {
      setState(State.Closed);
    } else if (state === State.Open) {
      hoverTimerRef.current = window.setTimeout(() => {
        hoverTimerRef.current = undefined;
        setState(State.Closed);
      }, 10);
    }
  };
  const isOpen = state === State.Open || isPinned;

  const setOpen = (open: boolean) => {
    if (open) {
      setState(State.Open);
      toggleSidebar();
    } else {
      setState(State.Closed);
      toggleSidebar();
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        open={isOpen}
        onMouseEnter={handleOpen}
        onFocus={handleOpen}
        onMouseLeave={handleClose}
        onBlur={handleClose}
        variant="permanent"
        sx={{
          overflow: "hidden",
          width: isOpen ? drawerWidthOpen : drawerWidthClosed,
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
            width: isOpen ? drawerWidthOpen : drawerWidthClosed,
            boxSizing: "border-box",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            ...(!isOpen && {
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            }),
          },
        }}
      >
        {/* <Toolbar /> */}
        <Box sx={{ overflow: "hidden" }}>
          <SidebarLogo isPinned={isOpen} />
          <List>
            <ListItem>
              <IconButton
                onClick={() => {
                  setOpen(!isOpen);
                  toggleSidebar();
                }}
              >
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
                  <ListItemIcon>
                    <span style={{ color: activeItem ? "#FFF" : "#b5b5b5" }}>
                      {item.icon}
                    </span>
                  </ListItemIcon>
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
