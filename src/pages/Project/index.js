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
import { loadProjectDetails } from './actions';

const mapStateToProps = state => ({
  tasks: projectId => getAllTasks(state).filter(t => t.projectId === projectId)
});

const mapDispatchToProps = dispatch => ({
  requestLoadProject: (token, projectId) =>
    dispatch(loadProjectDetails({ token, projectId })),
  openAddTaskDialog: initialTaskStatus =>
    dispatch(DialogActions.openAddTaskDialog(initialTaskStatus))
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
  const { openAddTaskDialog, match, requestLoadProject, tasks } = props;
  const projectId = match.params.id;

  const labels = ['TO IMPLEMENT', 'PARTIAL', 'COMPLETE'];

  const loadProject = async () => {
    const token = await getTokenSilently();
    requestLoadProject(token, projectId);
  };

  useEffect(() => {
    loadProject();
  }, []);

  return (
    <div className={classes.root}>
      <MenuBar title={props.title} />
      <Grid container spacing={16} className={classes.tasksContainer}>
        <Grid item xs={4}>
          <TaskList
            label={labels[0]}
            tasks={tasks(projectId).filter(t => t.status === labels[0])}
            onClickAddTask={openAddTaskDialog}
          />
        </Grid>
        <Grid item xs={4}>
          <TaskList
            label={labels[1]}
            tasks={tasks(projectId).filter(t => t.status === labels[1])}
            onClickAddTask={openAddTaskDialog}
          />
        </Grid>
        <Grid item xs={4}>
          <TaskList
            label={labels[2]}
            tasks={tasks(projectId).filter(t => t.status === labels[2])}
            onClickAddTask={openAddTaskDialog}
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
