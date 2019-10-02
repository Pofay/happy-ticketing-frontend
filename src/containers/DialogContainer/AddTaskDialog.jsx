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
import DialogContainerActions from './actions';
import { useAuth0 } from '../../components/auth0-wrapper';

const mapDispatchToProps = {
  submitTask: DialogContainerActions.submitTaskRequest
};

const mapStateToProps = state => ({
  dialogData: state.openedDialog.dialogData
});

const useStyles = makeStyles(theme => ({
  fields: {
    display: 'block',
    marginTop: '2%'
  },
  root: {
    width: 500
  }
}));

const AddTaskDialog = props => {
  const classes = useStyles();
  const { getTokenSilently } = useAuth0();
  const { initialTaskStatus, projectId } = props.dialogData;
  const [values, setValues] = useState({
    taskName: '',
    taskStatus: initialTaskStatus
  });

  const handleChange = name => event =>
    setValues({ ...values, [name]: event.target.value });

  const handleClose = event => {
    setValues({ taskName: '', taskStatus: '' });
    props.onClose();
  };

  const handleSubmit = async event => {
    const token = await getTokenSilently();
    props.submitTask(values.taskName, values.taskStatus, token, projectId);
    handleClose(event);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <DialogTitle id="form-dialog-title">Add a New Task</DialogTitle>
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
)(AddTaskDialog);
