import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MenuBar from '../../components/MenuBar';
import { Button, Grid, List, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../../components/auth0-wrapper';
import ProjectsPageActions from './actions';
import { withRouter } from 'react-router-dom';
import getAllProjects from './reducers/selectors';
import { pipe } from 'ramda';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginLeft: '2%',
    marginRight: '2%'
  }
}));

const mapStateToProps = state => ({
  projects: getAllProjects(state)
});

const mapDispatchToProps = dispatch => ({
  loadAllProjectsRequest: token =>
    pipe(
      ProjectsPageActions.loadAllProjectsRequest,
      dispatch
    )(token)
});

const Projects = props => {
  const classes = useStyles();
  const { projects, loadAllProjectsRequest } = props;
  const { getTokenSilently } = useAuth0();

  const loadProjects = async () => {
    const token = await getTokenSilently();
    loadAllProjectsRequest(token);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className={classes.root}>
      <MenuBar title={'Projects Page'} />
      <Grid container spacing={10}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => ({})}>Create New Project</Button>
          <List component="nav">
            {projects.map(p => (
              <ListItem key={p.id}>
                <Link to={`projects/${p.id}`}>{p.name}</Link>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Projects)
);
