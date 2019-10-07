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
  CardContent,
  Divider,
  Typography,
  LinearProgress
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { useAuth0 } from '../../components/auth0-wrapper';
import ProjectsPageActions from './actions';
import getAllProjects from './reducers/selectors';
import DialogContainerActions from '../../containers/DialogContainer/actions';
import ProjectSummary from '../../components/ProjectSummary';
import ProjectMembers from '../../components/ProjectMembers';

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
    width: 750,
    height: '20%'
  }
}));

const mapStateToProps = state => ({
  projects: getAllProjects(state),
  tasks: taskIds => taskIds.map(id => state.tasks.byId[id])
});

const mapDispatchToProps = {
  loadAllProjectsRequest: ProjectsPageActions.loadAllProjectsRequest,
  openAddProjectDialog: () => DialogContainerActions.openAddProjectDialog
};

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
    // eslint-disable-next-line
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
                            <ProjectMembers projectId={p.id} />
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
                      <br />
                      <Divider />
                      <Typography>
                        Completion {calculateProgress(tasks(p.tasks))}%
                      </Typography>
                      <br />
                      <LinearProgress
                        variant="determinate"
                        value={calculateProgress(tasks(p.tasks))}
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

const calculateProgress = tasks => {
  if (tasks.length === 0) return 0;
  const completedEstimate = tasks.reduce(
    (acc, cur) => acc + calculateEstimate(cur),
    0
  );
  const totalEstimate = tasks.reduce((acc, cur) => acc + cur.estimatedTime, 0);

  return Math.floor((completedEstimate / totalEstimate) * 100);
};

const calculateEstimate = ({ estimatedTime, status }) => {
  switch (status) {
    case 'TO IMPLEMENT':
      return 0;
    case 'PARTIAL':
      return estimatedTime / 2;
    default:
      return estimatedTime;
  }
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Projects)
);
