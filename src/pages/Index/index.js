import React from 'react';
import { Paper, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '../../components/auth0-wrapper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    maxWidth: 500,
    maxHeight: 500,
    margin: 'auto',
    marginTop: '5%',
    padding: '2%'
  },
  paper: {
    height: '100%',
    maxHeight: 600
  },
  login: {
    marginTop: '0.75%'
  }
}));
const Index = props => {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0();

  return loading ? (
    <div />
  ) : (
    <div className={classes.root}>
      <Paper className={classes.login}>
        <Typography variant="h5">
          Welcome to the Happy Ticketing Frontend
        </Typography>
        {!isAuthenticated && (
          <Button
            onClick={() => loginWithRedirect({})}
            className={classes.login}
            variant="contained"
          >
            Login
          </Button>
        )}
        {isAuthenticated && <Button variant="contained" onClick={() => logout()}>Log out</Button>}
      </Paper>
    </div>
  );
};

export default Index;
