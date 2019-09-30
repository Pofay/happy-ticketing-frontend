import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
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
import ProjectMembers from '../../components/ProjectMembers';

const mapDispatchToProps = dispatch => ({
  requestLoadProject: (token, projectId) =>
    dispatch(loadProjectDetails({ token, projectId })),
  openAddTaskDialog: projectId => initialTaskStatus =>
    dispatch(DialogActions.openAddTaskDialog({ initialTaskStatus, projectId })),
  openAddMemberDialog: projectId =>
    dispatch(DialogActions.openAddMemberDialog(projectId)),
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
    marginTop: '2%',
    marginLeft: '2%',
    marginRight: '2%'
  },
  avatar: {
    marginLeft: 10,
    marginRight: 5
  },
  members: {
    paddingTop: '5%'
  }
}));

const Project = props => {
  const classes = useStyles();
  const {
    match,
    openAddTaskDialog,
    openAddMemberDialog,
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
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <MenuBar title={name} />
      <Grid container justify="left" alignItems="flex-start">
        <Grid item>
          <Typography variant="h5" component="h5" className={classes.members}>
            Members:
          </Typography>
        </Grid>

        <ProjectMembers projectId={projectId} />
        <IconButton
          color="primary"
          aria-label="add"
          onClick={() => openAddMemberDialog(projectId)}
        >
          <AddIcon />
        </IconButton>
      </Grid>
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
