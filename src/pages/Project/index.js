import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TaskList from '../../components/TaskList';
import MenuBar from '../../components/MenuBar';
import DialogActions from '../../containers/DialogContainer/actions';
import submitDeleteTaskRequest from '../globalActions/submitDeleteTaskRequest';

import { makeMapStateToProps } from './reducers/selectors';
import { subscribeToProject, unsubscribeToProject } from './actions';
import ProjectMembers from '../../components/ProjectMembers';

const mapDispatchToProps = {
  openAddTaskDialog: DialogActions.openAddTaskDialog,
  openAddMemberDialog: DialogActions.openAddMemberDialog,
  openUpdateTaskDialog: DialogActions.openUpdateTaskDialog,
  subscribeToProject,
  unsubscribeToProject,
  submitDeleteTaskRequest
};

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
    openUpdateTaskDialog,
    channelName,
    name,
    tasks,
    subscribeToProject,
    unsubscribeToProject,
    submitDeleteTaskRequest
  } = props;
  const projectId = match.params.id;

  const labels = ['TO IMPLEMENT', 'PARTIAL', 'COMPLETE'];

  useEffect(() => {
    subscribeToProject(channelName);
    return unsubscribeToProject;
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <MenuBar title={name} />
      <Grid container alignItems="flex-start">
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
            projectId={projectId}
            tasks={tasks.filter(t => t.status === labels[0])}
            onClickAddTask={openAddTaskDialog}
            onClickMore={openUpdateTaskDialog}
            onClickDelete={submitDeleteTaskRequest}
          />
        </Grid>
        <Grid item xs={4}>
          <TaskList
            label={labels[1]}
            projectId={projectId}
            tasks={tasks.filter(t => t.status === labels[1])}
            onClickAddTask={openAddTaskDialog}
            onClickMore={openUpdateTaskDialog}
            onClickDelete={submitDeleteTaskRequest}
          />
        </Grid>
        <Grid item xs={4}>
          <TaskList
            label={labels[2]}
            projectId={projectId}
            tasks={tasks.filter(t => t.status === labels[2])}
            onClickAddTask={openAddTaskDialog}
            onClickMore={openUpdateTaskDialog}
            onClickDelete={submitDeleteTaskRequest}
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
