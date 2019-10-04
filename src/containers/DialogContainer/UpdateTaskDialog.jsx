import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '../../components/auth0-wrapper';
import DialogContainerActions from './actions';

const mapStateToProps = state => {
  /*
  const getMembersForProject = projectId => {
    const allMembers = state.members.byId;
    const projectMembers = state.projects.byId[projectId].members;
    return projectMembers.map(id => allMembers[id]);
  };*/

  const getMembersForProject = () => {
    const allMembers = state.members.byId;
    const { projectId } = state.openedDialog.dialogData;
    const projectMembers = state.projects.byId[projectId].members;
    return projectMembers.map(id => allMembers[id]);
  };

  return {
    dialogData: state.openedDialog.dialogData,
    members: getMembersForProject()
  };
};

const mapDispatchToProps = {
  updateTask: DialogContainerActions.submitUpdateTaskRequest
};

const useStyles = makeStyles(theme => ({
  fields: {
    display: 'block',
    marginTop: '2%'
  },
  root: {
    width: 500
  }
}));

const UpdateTaskDialog = props => {
  console.table(props);
  const classes = useStyles();
  const {
    taskName,
    taskStatus,
    assignedTo,
    taskId,
    projectId
  } = props.dialogData;
  const { members } = props;
  const { getTokenSilently } = useAuth0();
  const [values, setValues] = useState({
    taskName,
    taskStatus,
    assignedTo
  });

  const handleChange = name => event =>
    setValues({ ...values, [name]: event.target.value });

  const handleClose = event => {
    setValues({ taskName: '', taskStatus: '', assignedTo: '' });
    props.onClose();
  };

  const handleSubmit = async event => {
    const token = await getTokenSilently();
    props.updateTask(
      values.taskName,
      values.taskStatus,
      values.assignedTo,
      taskId,
      token,
      projectId
    );
    handleClose(event);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <DialogTitle id="form-dialog-title">Update Task Details</DialogTitle>
      <DialogContent>
        <TextField
          value={values.taskName}
          onChange={handleChange('taskName')}
          margin="dense"
          className={classes.fields}
          label="Name of Task"
          fullWidth
        ></TextField>
        <FormControl className={classes.fields}>
          <InputLabel>Task Status</InputLabel>
          <Select
            value={values.taskStatus}
            onChange={handleChange('taskStatus')}
            margin="dense"
            fullWidth
          >
            <MenuItem key={1} value={'TO IMPLEMENT'}>
              To Implement
            </MenuItem>
            <MenuItem key={2} value={'PARTIAL'}>
              Partial
            </MenuItem>
            <MenuItem key={3} value={'COMPLETE'}>
              Complete
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.fields}>
          <InputLabel>Assigned To</InputLabel>
          <Select
            value={values.assignedTo}
            onChange={handleChange('assignedTo')}
            margin="dense"
            fullWidth
          >
            {members.map(m => (
              <MenuItem key={m.id} value={m.email}>
                {m.email}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button type="submit" color="primary">
          Submit
        </Button>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </form>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateTaskDialog);
