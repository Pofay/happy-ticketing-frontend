import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  Paper,
  Typography,
  ListItemSecondaryAction,
  Button,
  IconButton
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  list: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#9e9e9e',
    margin: 'auto'
  },
  paper: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#424242',
    color: 'white'
  },
  container: {
    maxWidth: 400,
    width: '100%',
    padding: '10px',
    backgroundColor: '#424242',
    color: 'white'
  },
  more: {
    color: 'white'
  },
  addTask: {
    width: '100%'
  }
}));

const Task = props => {
  const classes = useStyles();
  const { onClickMore } = props;

  return (
    <ListItem key={props.id}>
      <Paper className={classes.paper}>
        <Typography variant="h6">{props.name}</Typography>
        <Typography variant="h6">Assigned To: {props.assignedTo}</Typography>
        <Typography variant="h6">
          Estimated Time: {props.estimatedTime} Hours
        </Typography>
        <ListItemSecondaryAction>
          <IconButton
            className={classes.more}
            aria-label="settings"
            onClick={event => {
              event.preventDefault();
              onClickMore(
                props.name,
                props.status,
                props.assignedTo,
                props.estimatedTime,
                props.id
              );
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </Paper>
    </ListItem>
  );
};

const AddTicketButton = props => {
  const classes = useStyles();

  return (
    <Paper>
      <Button
        variant="contained"
        className={classes.addTask}
        onClick={props.onClick}
      >
        <AddIcon />
        Add New Ticket
      </Button>
    </Paper>
  );
};

// Props: Label, Tasks, OnClickAddTicket, OnClickMoreOptions
const TaskList = props => {
  const classes = useStyles();
  const { onClickAddTask, onClickMore, label, tasks, projectId } = props;

  const handleAddTask = event => {
    event.preventDefault();
    onClickAddTask(projectId, label);
  };

  const handleUpdateTask = (name, status, assignedTo, estimatedTime, id) => {
    onClickMore(projectId, name, status, assignedTo, estimatedTime, id);
  };

  return (
    <Paper className={classes.container}>
      <Typography variant="h5">{label}</Typography>
      <List className={classes.list}>
        {tasks.map(t => (
          <Task key={t.id} onClickMore={handleUpdateTask} {...t} />
        ))}
      </List>
      <AddTicketButton onClick={handleAddTask} />
    </Paper>
  );
};

export default TaskList;
