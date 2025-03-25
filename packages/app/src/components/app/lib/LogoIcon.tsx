import makeStyles from '@mui/styles/makeStyles';
import React, { useContext } from 'react';
import { AppContext } from '../AppProvider';
import logo from '../../asset/logo.png'
  

const useStyles = makeStyles({
  png: {
    width: 'auto',
    height: '3rem',
    marginLeft: '15px'
  },
  fullpng: {
    width: 'auto',
    height: '8rem',
    padding: '1.5rem',
    margin: '2rem 2rem 0 3rem'
  },
});

const LogoIcon = () => {
  const { isPinned } = useContext(AppContext);
  const classes = useStyles();

  return <img className={!isPinned? classes.png : classes.fullpng} src={logo} alt="Logo" />;
};

export default LogoIcon;