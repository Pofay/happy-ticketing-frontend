import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MenuBar from '../../components/MenuBar';
import { Grid, List, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../../components/auth0-wrapper';
import { loadAllProjectsRequest } from './actions';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginLeft: '2%',
    marginRight: '2%'
  }
}));

const mapStateToProps = state => ({
  projects: state.projects.allIds.map(id => state.projects.byId[id])
});

const mapDispatchToProps = dispatch => ({
  loadAllProjectsRequest: token => dispatch(loadAllProjectsRequest(token))
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