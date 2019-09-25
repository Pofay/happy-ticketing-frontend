import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MenuBar from '../../components/MenuBar';
import {
  Button,
  Grid,
  List,
  ListItem,
  Card,
  Paper,
  CardContent,
  Divider,
  Typography,
  GridList,
  GridListTile
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../../components/auth0-wrapper';
import ProjectsPageActions from './actions';
import { withRouter } from 'react-router-dom';
import getAllProjects from './reducers/selectors';
import DialogContainerActions from '../../containers/DialogContainer/actions';
import { pipe } from 'ramda';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginLeft: '2%',
    marginRight: '2%'
  },
  items: {
    marginLeft: '20%',
    marginRight: '20%'
  },
  card: {
    width: 750
  },
  toImplement: {
    padding: 5,
    textAlign: 'center',
    border: 'solid'
  },
  partial: {
    padding: 5,
    textAlign: 'center',
    background: 'linear-gradient(to right, green 50%, white 50%)',
    border: 'solid'
  },
  complete: {
    padding: 5,
    textAlign: 'center',
    background: 'green',
    border: 'solid'
  },
  section: {
    marginTop: '2%'
  },
  tile: {
    minWidth: 80
  }
}));

const mapStateToProps = state => ({
  projects: getAllProjects(state),
  tasks: taskIds => taskIds.map(id => state.tasks.byId[id])
});

const mapDispatchToProps = dispatch => ({
  loadAllProjectsRequest: token =>
    pipe(
      ProjectsPageActions.loadAllProjectsRequest,
      dispatch
    )(token),
  openAddProjectDialog: () =>
    dispatch(DialogContainerActions.openAddProjectDialog)
});

const Projects = props => {
  const classes = useStyles();
  const {
    projects,
    tasks,
    openAddProjectDialog,
    loadAllProjectsRequest
  } = props;
  const { getTokenSilently } = useAuth0();

  const loadProjects = async () => {
    const token = await getTokenSilently();
    loadAllProjectsRequest(token);
  };

  const handleClick = event => {
    openAddProjectDialog();
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className={classes.root}>
      <MenuBar title={'Projects Page'} />
      <div className={classes.items}>
        <Grid container spacing={10}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleClick}>
              Create New Project
            </Button>
            <List component="nav">
              {projects.map(p => (
                <ListItem key={p.id}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography variant="h5" component="h1">
                        <Link to={`projects/${p.id}`}>{p.name}</Link>
                      </Typography>
                      <Divider />
                      <Typography variant="h5" component="h2">
                        Members
                      </Typography>
                      <Divider />
                      <div className={classes.section}>
                        <Typography variant="h6" component="h6">
                          To Implement
                        </Typography>
                        <GridList cellHeight={40}>
                          {tasks(p.tasks)
                            .filter(t => t.status === 'TO IMPLEMENT')
                            .map(t => (
                              <GridListTile key={t.id} className={classes.tile}>
                                <Paper
                                  component="div"
                                  className={classes.toImplement}
                                >
                                  {t.name}
                                </Paper>
                              </GridListTile>
                            ))}
                        </GridList>
                      </div>
                      <div className={classes.section}>
                        <Typography variant="h6" component="h6">
                          Partial
                        </Typography>
                        <GridList cellHeight={40}>
                          {tasks(p.tasks)
                            .filter(t => t.status === 'PARTIAL')
                            .map(t => (
                              <GridListTile key={t.id} className={classes.tile}>
                                <Paper
                                  component="div"
                                  className={classes.partial}
                                >
                                  {t.name}
                                </Paper>
                              </GridListTile>
                            ))}
                        </GridList>
                      </div>
                      <div className={classes.section}>
                        <Typography variant="h6" component="h6">
                          Complete
                        </Typography>
                        <GridList cellHeight={40}>
                          {tasks(p.tasks)
                            .filter(t => t.status === 'COMPLETE')
                            .map(t => (
                              <GridListTile key={t.id} className={classes.tile}>
                                <Paper
                                  component="div"
                                  className={classes.complete}
                                >
                                  {t.name}
                                </Paper>
                              </GridListTile>
                            ))}
                        </GridList>
                      </div>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Projects)
);
