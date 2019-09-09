import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '../../components/auth0-wrapper';
import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from '@material-ui/core';
import DialogContainerActions from './actions';

const useStyles = makeStyles(theme => ({
  fields: {
    display: 'block',
    marginTop: '2%'
  },
  root: {
    width: 500
  }
}));

const mapDispatchToProps = dispatch => ({
  submitProject: (token, projectName) =>
    dispatch(
      DialogContainerActions.submitProjectRequest({ token, projectName })
    )
});

const AddProjectDialog = props => {
  const [projectName, setProjectName] = useState('');
  const { getTokenSilently } = useAuth0();
  const classes = useStyles();

  const handleChange = event => setProjectName(event.target.value);

  const handleClose = event => {
    setProjectName('');
    props.onClose();
  };

  const handleSubmit = event => {
    // call getTokenFromApi
    getTokenSilently()
      .then(token => props.submitProject(token, projectName))
      .then(() => handleClose(event));
  };

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <DialogTitle id="form-dialog-title">Add a New Project</DialogTitle>
      <DialogContent>
        <TextField
          value={projectName}
          onChange={handleChange}
          margin="dense"
          className={classes.fields}
          label="Project Name"
          fullWidth
        ></TextField>
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
  null,
  mapDispatchToProps
)(AddProjectDialog);
