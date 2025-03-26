import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import logo from '../asset/logo.png';


export const drawerWidthClosed = 72;
export const logoHeight = 32;
export const drawerWidthOpen = 224;

const useSidebarLogoStyles = makeStyles({
  root: {
    width: drawerWidthClosed,
    height: 3 * logoHeight,
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    marginBottom: -14,
  },
  logo: {
    width: 'auto',
    height: '3rem',
    marginLeft: '15px'
  },
  fulllogo: {
    width: 'auto',
    height: '8rem',
    padding: '1.5rem',
    margin: '2rem 2rem 0 3rem'
  },
});

interface LogoIconProps {
  isPinned: boolean;
}

const SidebarLogo: React.FC<LogoIconProps> = ({ isPinned }) => {
  const classes = useSidebarLogoStyles();

  return (
    <div className={classes.root}>
      <img className={!isPinned? classes.logo : classes.fulllogo} src={logo} alt="Logo" />;
    </div>
  );
};

export default SidebarLogo;