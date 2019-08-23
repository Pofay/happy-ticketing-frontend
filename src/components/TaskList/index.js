import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  Paper,
  Typography,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
  }
}));

const TaskList = props => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Typography variant="h5">{props.label}</Typography>
      <List className={classes.list}>
        {props.tasks.map(t => (
          <ListItem key={t.id}>
            <Paper className={classes.paper}>
              <Typography variant="h6">{t.name}</Typography>
              <Typography variant="h6">Assigned To: {t.assignedTo}</Typography>
              <ListItemSecondaryAction>
                <IconButton className={classes.more} aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </Paper>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TaskList;
