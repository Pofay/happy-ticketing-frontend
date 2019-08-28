import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TaskList from '../../components/TaskList';
import MenuBar from '../../components/MenuBar';

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

  const labels = ['TO IMPLEMENT', 'PARTIAL', 'COMPLETE'];
  const tasks = props.tasks;

  return (
    <div className={classes.root}>
      <MenuBar title={props.title} />
      <Grid container spacing={16} className={classes.tasksContainer}>
        <Grid item xs={4}>
          <TaskList label={labels[0]} tasks={tasks} />
        </Grid>
        <Grid item xs={4}>
          <TaskList label={labels[1]} tasks={tasks} />
        </Grid>
        <Grid item xs={4}>
          <TaskList label={labels[2]} tasks={tasks} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Project;
