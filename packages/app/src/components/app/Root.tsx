import React, { PropsWithChildren } from "react";
import { Box, CssBaseline } from "@mui/material";
import Navigation from "./Navigation";


export const Root = ({ children }: PropsWithChildren<{}>) => (
  <Box sx={{ display: "flex" }}>
    <CssBaseline />
    {/* Drawer */}
    <Navigation />
    {/* Page principale */}
    <Box
      component="main"
      sx={{
        backgroundColor: '#F8F8F8',
        flexGrow: 1,
        // p: 3,
        // width: `calc(100% - ${open ? drawerWidth : collapsedDrawerWidth}px)`,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
      }}
    >
      {/* Contenu de la page principale */}
      {children}
    </Box>
  </Box>
);

export default Root;
