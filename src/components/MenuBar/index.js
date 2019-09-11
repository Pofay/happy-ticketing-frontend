import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '../auth0-wrapper';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  appBar: {
    marginBottom: '2%',
    marginTop: '0.75%'
  }
}));

const MenuBar = props => {
  const classes = useStyles();
  const { logout } = useAuth0();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          aria-label="menu"
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {props.title}
        </Typography>
        <Button edge="end" variant="contained" color="secondary" onClick={() => logout()}>
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
