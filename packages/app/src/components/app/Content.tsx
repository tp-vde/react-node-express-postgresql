import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';


/** @public */
export type VdeContentClassKey = 'root' | 'stretch' | 'noPadding';

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      // background: 'green',
      // marginTop: '3em',
      gridArea: 'pageContent',
      minWidth: 0,
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(20),
      paddingRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
      },
    },
    stretch: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    noPadding: {
      padding: 0,
    },
  }),
  { name: 'vde' },
);

type Props = {
  stretch?: boolean;
  noPadding?: boolean;
  className?: string;
};

/**
 * The main content part inside a {@link Page}.
 *
 * @public
 *
 */

export function Content(props: PropsWithChildren<Props>) {
  const { className, stretch, noPadding, children, ...restProps } = props;

  const classes = useStyles();
  return (
    <article
      {...restProps}
      className={classNames(classes.root, className, {
        [classes.stretch]: stretch,
        [classes.noPadding]: noPadding,
      })}
    >
      {children}
    </article>
  );
}
