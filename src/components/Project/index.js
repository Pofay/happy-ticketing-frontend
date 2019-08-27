import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TaskList from '../TaskList';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const Project = props => {
  const classes = useStyles();

  const labels = ['TO IMPLEMENT', 'PARTIAL', 'COMPLETE'];
  const tasks = props.tasks;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
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
