import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { head } from 'ramda';
import MenuBar from '../../components/MenuBar';
import {
  Button,
  Grid,
  List,
  ListItem,
  Card,
  CardContent,
  Divider,
  Typography,
  Tooltip,
  Avatar
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../../components/auth0-wrapper';
import ProjectsPageActions from './actions';
import { withRouter } from 'react-router-dom';
import getAllProjects from './reducers/selectors';
import DialogContainerActions from '../../containers/DialogContainer/actions';
import { pipe } from 'ramda';
import ProjectSummary from '../../components/ProjectSummary';

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
  }
}));

const mapStateToProps = state => ({
  projects: getAllProjects(state),
  tasks: taskIds => taskIds.map(id => state.tasks.byId[id]),
  members: memberIds => memberIds.map(id => state.members.byId[id])
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
    members,
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
                      <br />
                      <Divider />
                      <br />
                      <Typography variant="h5" component="h2">
                        Members
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Grid
                            container
                            justify="center"
                            alignItems="center"
                            spacing={4}
                          >
                            {members(p.members).map(m => (
                              <Tooltip key={m.id} title={m.email}>
                                <Avatar>{head(m.email).toUpperCase()}</Avatar>
                              </Tooltip>
                            ))}
                          </Grid>
                        </Grid>
                      </Grid>
                      <br />
                      <Divider />
                      <br />
                      <ProjectSummary
                        tasks={tasks(p.tasks).filter(
                          t => t.status === 'TO IMPLEMENT'
                        )}
                        statusTitle={'TO IMPLEMENT'}
                      />
                      <ProjectSummary
                        tasks={tasks(p.tasks).filter(
                          t => t.status === 'PARTIAL'
                        )}
                        statusTitle={'PARTIAL'}
                      />
                      <ProjectSummary
                        tasks={tasks(p.tasks).filter(
                          t => t.status === 'COMPLETE'
                        )}
                        statusTitle={'COMPLETE'}
                      />
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
