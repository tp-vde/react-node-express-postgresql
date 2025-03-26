import MaterialBreadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import withStyles from '@mui/styles/withStyles';
import React, { ComponentProps, Fragment } from 'react';

type Props = ComponentProps<typeof MaterialBreadcrumbs>;

/** @public */
export type BreadcrumbsClickableTextClassKey = 'root';

const ClickableText = withStyles(
  {
    root: {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  { name: 'VdeBreadcrumbsClickableText' },
)(Typography);

/** @public */
export type BreadcrumbsStyledBoxClassKey = 'root';

const StyledBox = withStyles(
  {
    root: {
      textDecoration: 'underline',
      color: 'inherit',
    },
  },
  { name: 'VdeBreadcrumbsStyledBox' },
)(Box);

/** @public */
export type BreadcrumbsCurrentPageClassKey = 'root';

const BreadcrumbsCurrentPage = withStyles(
  {
    root: {
      fontStyle: 'italic',
    },
  },
  { name: 'BreadcrumbsCurrentPage' },
)(Box);

/**
 * Breadcrumbs component to show navigation hierarchical structure
 *
 * @public
 *
 */
export function Breadcrumbs(props: Props) {
  const { children, ...restProps } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const childrenArray = React.Children.toArray(children);

  const [firstPage, secondPage, ...expandablePages] = childrenArray;
  const currentPage = expandablePages.length
    ? expandablePages.pop()
    : childrenArray[childrenArray.length - 1];
  const hasHiddenBreadcrumbs = childrenArray.length > 3;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Fragment>
      <MaterialBreadcrumbs aria-label="breadcrumb" {...restProps}>
        {childrenArray.length > 1 && <StyledBox >{firstPage}</StyledBox>}
        {childrenArray.length > 2 && <StyledBox >{secondPage}</StyledBox>}
        {hasHiddenBreadcrumbs && (
          <ClickableText onClick={handleClick}>...</ClickableText>
        )}
        <BreadcrumbsCurrentPage>{currentPage}</BreadcrumbsCurrentPage>
      </MaterialBreadcrumbs>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <List>
          {expandablePages.map((pageLink, index) => (
            <ListItem key={index}>
              <StyledBox>{pageLink}</StyledBox>
            </ListItem>
          ))}
        </List>
      </Popover>
    </Fragment>
  );
}
