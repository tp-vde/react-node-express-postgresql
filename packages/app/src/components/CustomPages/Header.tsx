import React, { CSSProperties, PropsWithChildren, ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { Breadcrumbs } from './Breadcrumbs';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { accountSrevice } from '../../helper/accountSrevice';


/** @public */
export type HeaderClassKey =
  | 'header'
  | 'leftItemsBox'
  | 'rightItemsBox'
  | 'title'
  | 'subtitle'
  | 'type'
  | 'breadcrumb'
  | 'breadcrumbType'
  | 'breadcrumbTitle';

const useStyles = makeStyles(
  (theme: Theme) => ({
    header: {
      gridArea: 'pageHeader',
      padding: theme.spacing(2),
      width: '100%',
      boxShadow: theme.shadows[4],
      position: 'relative',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundImage: 'linear-gradient(-137deg,rgb(7, 188, 243) 0%, #410c93 100%)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
      },
    },
    leftItemsBox: {
      maxWidth: '100%',
      flexGrow: 1,
    },
    rightItemsBox: {
      width: 'auto',
      alignItems: 'center',
    },
    title: {
      color: '#FFFFFF',
      wordBreak: 'break-word',
      fontSize: theme.typography.h3.fontSize,
      marginBottom: 0,
    },
    subtitle: {
      color: '#FFFFFF',
      opacity: 0.8,
      display: 'inline-block',
      marginTop: theme.spacing(1),
      maxWidth: '75ch',
    },
    type: {
      textTransform: 'uppercase',
      fontSize: 11,
      opacity: 0.8,
      marginBottom: theme.spacing(1),
      color: '#FFFFFF',
    },
    breadcrumb: {
      color: '#FFFFFF',
    },
    breadcrumbType: {
      fontSize: 'inherit',
      opacity: 0.7,
      marginRight: -theme.spacing(0.3),
      marginBottom: theme.spacing(0.3),
    },
    breadcrumbTitle: {
      fontSize: 'inherit',
      marginLeft: -theme.spacing(0.3),
      marginBottom: theme.spacing(0.3),
    },
  }),
  { name: 'VdeHeader' },
);


type HeaderStyles = ReturnType<typeof useStyles>;

type Props = {
  component?: ReactNode;
  pageTitleOverride?: string;
  style?: CSSProperties;
  subtitle?: ReactNode;
  title: ReactNode;
  tooltip?: string;
  type?: string;
  typeLink?: string;
};

type TypeFragmentProps = {
  classes: HeaderStyles;
  pageTitle: string | ReactNode;
  type?: Props['type'];
  typeLink?: Props['typeLink'];
};

type TitleFragmentProps = {
  classes: HeaderStyles;
  pageTitle: string | ReactNode;
  tooltip?: Props['tooltip'];
};

type SubtitleFragmentProps = {
  classes: HeaderStyles;
  subtitle?: Props['subtitle'];
};

const TypeFragment = ({
  type,
  typeLink,
  classes,
  pageTitle,
}: TypeFragmentProps) => {
  if (!type) {
    return null;
  }

  if (!typeLink) {
    return <Typography className={classes.type}>{type}</Typography>;
  }

  return (
    <Breadcrumbs className={classes.breadcrumb}>
      <Link href={typeLink}>{type}</Link>
      <Typography>{pageTitle}</Typography>
    </Breadcrumbs>
  );
};

const TitleFragment = ({ pageTitle, classes, tooltip }: TitleFragmentProps) => {
  const FinalTitle = (
    <Typography
      tabIndex={-1}
      className={classes.title}
      variant="h4"
    >
      {pageTitle}
    </Typography>
  );

  if (!tooltip) {
    return FinalTitle;
  }

  return (
    <Tooltip title={tooltip} placement="top-start">
      {FinalTitle}
    </Tooltip>
  );
};

const SubtitleFragment = ({ classes, subtitle }: SubtitleFragmentProps) => {
  if (!subtitle) {
    return null;
  }

  if (typeof subtitle !== 'string') {
    return <>{subtitle}</>;
  }

  return (
    <Typography
      className={classes.subtitle}
      variant="subtitle2"
      component="span"
    >
      {subtitle}
    </Typography>
  );
};
/**
 * Vde main header with abstract color background in multiple variants
 *
 * @public
 *
 */
export function Header(props: PropsWithChildren<Props>) {
  const {
    children,
    pageTitleOverride,
    style,
    subtitle,
    title,
    tooltip,
    type,
    typeLink,
  } = props;
  const classes = useStyles();

  const navigate = useNavigate();
  
  const appTitle = 'Vde';
  const documentTitle = pageTitleOverride || title;
  const pageTitle = title || pageTitleOverride;
  const titleTemplate = `${documentTitle} | %s | ${appTitle}`;
  const defaultTitle = `${documentTitle} | ${appTitle}`;

  const logout = () => {
    accountSrevice.logout();
    navigate("/login");
  };
  
  return (
    <>
      <Helmet titleTemplate={titleTemplate} defaultTitle={defaultTitle} />
      <header style={style} className={classes.header}>
        <Box className={classes.leftItemsBox}>
          <TypeFragment
            classes={classes}
            type={type}
            typeLink={typeLink}
            pageTitle={pageTitle}
          />
          <TitleFragment
            classes={classes}
            pageTitle={pageTitle}
            tooltip={tooltip}
          />
          <SubtitleFragment classes={classes} subtitle={subtitle} />
        </Box>
          <Grid container
           direction= 'row'   
           spacing={1}
           alignItems="center"
           color= '#FFFFFF'
            >
          <Typography >LOGOUT</Typography>
            <IconButton size="small"
            title="Logout"
            color="inherit"
            aria-label="logout"
            onClick={logout}
            edge="start"
            sx={{ alignItems:'center', flexDirection:'row' }}
          >  
            <LogoutIcon />
          </IconButton>
          </Grid >
        <Grid container className={classes.rightItemsBox} spacing={4}>
          {children}
        </Grid>
      </header>
    </>
  );
}
