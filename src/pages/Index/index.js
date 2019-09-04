import React from 'react';
import { Paper, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../../components/auth0-wrapper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    maxWidth: 500,
    maxHeight: 500,
    margin: 'auto',
    marginTop: '5%'
  },
  paper: {
    height: 120,
    padding: '2%'
  },
  login: {
    marginTop: '2%'
  },
  projectLink: {
    marginTop: '2%',
    marginLeft: '0.75%'
  }
}));

const LoggedInPrompt = props => {
  const classes = useStyles();
  const { logout } = useAuth0();

  return (
    <>
      <Typography variant="h6">You are currently logged in.</Typography>

      <Button
        className={classes.login}
        variant="contained"
        onClick={() => logout()}
      >
        Log out
      </Button>
      <Button className={classes.projectLink} variant="contained">
        <Link to="/projects">Go to Projects</Link>
      </Button>
    </>
  );
};

const LoggedOutPrompt = props => {
  const { loginWithRedirect } = useAuth0();
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6">You are not logged in.</Typography>
      <Button
        onClick={() => loginWithRedirect({})}
        className={classes.login}
        variant="contained"
      >
        Login
      </Button>
    </>
  );
};
const Index = props => {
  const classes = useStyles();
  const { isAuthenticated, loading } = useAuth0();

  return loading ? (
    <div />
  ) : (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h5">
          Welcome to the Happy Ticketing Frontend.
        </Typography>

        {!isAuthenticated && <LoggedOutPrompt />}

        {isAuthenticated && <LoggedInPrompt />}
      </Paper>
    </div>
  );
};

export default Index;
