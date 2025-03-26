import React, { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { Theme, useTheme } from '@mui/material';

/** @public */
export const Filters = (props: {
  children: React.ReactNode;
  options?: {
    drawerBreakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
    drawerAnchor?: 'left' | 'right' | 'top' | 'bottom';
  };
}) => {
  const isScreenSmallerThanBreakpoint = useMediaQuery(
    (theme: Theme) =>
      theme.breakpoints.down(props.options?.drawerBreakpoint ?? 'md'),
    { noSsr: true },
  );
  const theme = useTheme();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);

  return isScreenSmallerThanBreakpoint ? (
    <>
      <Button
        style={{ marginTop: theme.spacing(1), marginLeft: theme.spacing(1) }}
        onClick={() => setFilterDrawerOpen(true)}
        startIcon={<FilterListIcon />}
      >
       buttonTitle
      </Button>
      <Drawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        anchor={props.options?.drawerAnchor ?? 'left'}
        disableAutoFocus
        keepMounted
        variant="temporary"
      >
        <Box m={2}>
          <Typography
            variant="h6"
            component="h2"
            style={{ marginBottom: theme.spacing(1) }}
          >
           title
          </Typography>
          {props.children}
        </Box>
      </Drawer>
    </>
  ) : (
    <Grid sx={{lg:2}}>
      {props.children}
    </Grid>
  );
};

/** @public */
export const Content = (props: { children: React.ReactNode }) => {
  return (
    <Grid sx={{xs:12, lg:10}} >
      {props.children}
    </Grid>
  );
};

/** @public */
export const VderLayout = (props: { children: React.ReactNode }) => {
  return (
    <Grid container style={{ position: 'relative' }}>
      {props.children}
    </Grid>
  );
};

VderLayout.Filters = Filters;
VderLayout.Content = Content;
