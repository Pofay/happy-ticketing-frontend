import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TaskList from '../../components/TaskList';
import MenuBar from '../../components/MenuBar';
import DialogActions from '../../containers/DialogContainer/actions';

import { makeMapStateToProps } from './reducers/selectors';
import {
  loadProjectDetails,
  subscribeToProject,
  unsubscribeToProject
} from './actions';

const mapDispatchToProps = dispatch => ({
  requestLoadProject: (token, projectId) =>
    dispatch(loadProjectDetails({ token, projectId })),
  openAddTaskDialog: projectId => initialTaskStatus =>
    dispatch(DialogActions.openAddTaskDialog({ initialTaskStatus, projectId })),
  subscribeToChanges: channelName => dispatch(subscribeToProject(channelName)),
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
  const {
    match,
    openAddTaskDialog,
    channelName,
    name,
    tasks,
    subscribeToChanges,
    unsubscribeToChanges
  } = props;
  const projectId = match.params.id;

  const labels = ['TO IMPLEMENT', 'PARTIAL', 'COMPLETE'];

  useEffect(() => {
    subscribeToChanges(channelName);
    return unsubscribeToChanges;
  }, []);

  return (
    <div className={classes.root}>
      <MenuBar title={name} />
      <Grid container spacing={16} className={classes.tasksContainer}>
        <Grid item xs={4}>
          <TaskList
            label={labels[0]}
            tasks={tasks.filter(t => t.status === labels[0])}
            onClickAddTask={openAddTaskDialog(projectId)}
          />
        </Grid>
        <Grid item xs={4}>
          <TaskList
            label={labels[1]}
            tasks={tasks.filter(t => t.status === labels[1])}
            onClickAddTask={openAddTaskDialog(projectId)}
          />
        </Grid>
        <Grid item xs={4}>
          <TaskList
            label={labels[2]}
            tasks={tasks.filter(t => t.status === labels[2])}
            onClickAddTask={openAddTaskDialog(projectId)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(
  connect(
    makeMapStateToProps(),
    mapDispatchToProps
  )(Project)
);
