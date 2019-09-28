import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from '@material-ui/core';
import { connect } from 'react-redux';
import { useAuth0 } from '../../components/auth0-wrapper';
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

const mapStateToProps = state => ({
  dialogData: state.openedDialog.dialogData
});

const mapDispatchToProps = dispatch => ({
  submitMember: (email, projectId, token) =>
    dispatch(
      DialogContainerActions.submitMemberRequest(email, projectId, token)
    )
});

const AddMemberDialog = props => {
  const classes = useStyles();
  const { projectId } = props.dialogData;
  const { submitMember } = props;
  const { getTokenSilently } = useAuth0();
  const [email, setEmail] = useState('');

  const handleChange = event => setEmail(event.target.value);

  const handleClose = event => {
    setEmail('');
    props.onClose();
  };
  const handleSubmit = async event => {
    const token = await getTokenSilently();
    submitMember(email, projectId, token);
    handleClose(event);
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMemberDialog);
