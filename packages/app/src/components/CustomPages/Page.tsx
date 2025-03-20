import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { Theme } from '@mui/material/styles';


const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gridTemplateAreas:
        "'pageHeader pageHeader pageHeader' 'pageSubheader pageSubheader pageSubheader' 'pageNav pageContent pageSidebar'",
      gridTemplateRows: 'max-content auto 1fr',
      gridTemplateColumns: 'auto 1fr auto',
      overflowY: 'auto',
      height: '100vh',
      [theme.breakpoints.down('xs')]: {
        height: '100%',
      },
      '@media print': {
        display: 'block',
        height: 'auto',
        overflowY: 'inherit',
      },
    },
  }),
  { name: 'VdePage' },
);

type Props = {
  children?: React.ReactNode;
};

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

export function Page(props: Props) {
  const { children } = props;
  const classes = useStyles();
  return (
    // <ThemeProvider theme={lightTheme}>
      <main className={classes.root}>{children}</main>
    // </ThemeProvider>
  );
}
