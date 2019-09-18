import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TaskList from '../../components/TaskList';
import MenuBar from '../../components/MenuBar';
import { useAuth0 } from '../../components/auth0-wrapper';
import DialogActions from '../../containers/DialogContainer/actions';

import { getAllTasks } from './reducers/selectors';
import {
  loadProjectDetails,
  subscribeToProject,
  unsubscribeToProject
} from './actions';

const mapStateToProps = state => ({
  getTasks: projectId =>
    getAllTasks(state).filter(t => t.projectId === projectId),
  getName: projectId => state.projects.byId[projectId].name,
  getChannelName: projectId => state.projects.byId[projectId].channelName
});

const mapDispatchToProps = dispatch => ({
  requestLoadProject: (token, projectId) =>
    dispatch(loadProjectDetails({ token, projectId })),
  openAddTaskDialog: projectId => initialTaskStatus =>
    dispatch(DialogActions.openAddTaskDialog({ initialTaskStatus, projectId })),
  subscribeToChanges: (channelName, projectId) =>
    dispatch(
      subscribeToProject({
        channelName,
        projectId
      })
    ),
  unsubscribeToChanges: () => dispatch(unsubscribeToProject)
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginLeft: '2%',
    marginRight: '2%'
  },
  tasksContainer: {
    marginLeft: '2%',
    marginRight: '2%'
  }
}));

const Project = props => {
  const classes = useStyles();
  const { getTokenSilently } = useAuth0();
  const {
    openAddTaskDialog,
    match,
    requestLoadProject,
    getTasks,
    getName,
    getChannelName,
    subscribeToChanges,
    unsubscribeToChanges
  } = props;
  const projectId = match.params.id;

  const labels = ['TO IMPLEMENT', 'PARTIAL', 'COMPLETE'];

  const loadProject = async () => {
    const token = await getTokenSilently();
    requestLoadProject(token, projectId);
  };

  useEffect(() => {
    loadProject();
    subscribeToChanges(getChannelName(projectId), projectId);
    return unsubscribeToChanges;
  }, []);

  return (
    <div className={classes.root}>
      <MenuBar title={getName(projectId)} />
      <Grid container spacing={16} className={classes.tasksContainer}>
        <Grid item xs={4}>
          <TaskList
            label={labels[0]}
            tasks={getTasks(projectId).filter(t => t.status === labels[0])}
            onClickAddTask={openAddTaskDialog(projectId)}
          />
        </Grid>
        <Grid item xs={4}>
          <TaskList
            label={labels[1]}
            tasks={getTasks(projectId).filter(t => t.status === labels[1])}
            onClickAddTask={openAddTaskDialog(projectId)}
          />
        </Grid>
        <Grid item xs={4}>
          <TaskList
            label={labels[2]}
            tasks={getTasks(projectId).filter(t => t.status === labels[2])}
            onClickAddTask={openAddTaskDialog(projectId)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Project)
);
