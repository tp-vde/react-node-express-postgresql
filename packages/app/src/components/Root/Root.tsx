import { PropsWithChildren } from "react";
import { Box, CssBaseline } from "@mui/material";
import Navigation from "./Navigation";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../CustomPages/AuthContext";

export const Root = ({ children }: PropsWithChildren<{}>) => (
  <AuthProvider>
    <Box sx={{ display: "flex" }}>
      <Router>
        <CssBaseline />
        {/* Drawer */}
        <Navigation />
        {/* Page principale */}
        <Box
          component="main"
          sx={{
            backgroundColor: "#F8F8F8",
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
      </Router>
    </Box>
  </AuthProvider>
);

export default Root;
