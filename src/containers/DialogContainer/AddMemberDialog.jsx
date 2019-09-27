import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '../../components/auth0-wrapper';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  fields: {
    display: 'block',
    marginTop: '2%'
  },
  root: {
    width: 500
  }
}));

const mapStateToProps = state => ({
  dialogData: state.openedDialog.dialogData
});

const AddMemberDialog = props => {
  const classes = useStyles();
  const { projectId } = props.dialogData;
  const { getTokenSilently } = useAuth0();
  const [email, setEmail] = useState('');

  const handleChange = event => setEmail(event.target.value);

  const handleClose = event => {
    setEmail('');
    props.onClose();
  };
  const handleSubmit = event => {
    // getTokenSilently
    // dispatch action(email,projectId, token) to submit add member request
    // handleClose()
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <DialogTitle id="form-dialog-title">Invite New Member</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter a registered email to be a member of this current project.
        </DialogContentText>
        <TextField
          value={email}
          onChange={handleChange}
          margin="dense"
          className={classes.fields}
          label="Email Address"
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

export default connect(mapStateToProps)(AddMemberDialog);
