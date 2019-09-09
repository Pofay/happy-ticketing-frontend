import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import AddTaskDialog from './AddTaskDialog';
import DialogActions from './actions';

const mapStateToProps = state => ({
  isOpen: state.openedDialog.isOpen,
  dialogType: state.openedDialog.dialogType
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(DialogActions.closeDialog)
});

const DialogContainer = ({ isOpen, dialogType, close }) => (
  <Dialog open={isOpen} onClose={close} aria-labelledby="form-dialog-title">
    {renderAppropiateDialog(dialogType, close)}
  </Dialog>
);

const renderAppropiateDialog = (dialogType, onClose) => {
  switch (dialogType) {
    case 'ADD_TASK_DIALOG':
      return <AddTaskDialog onClose={onClose} />;
    default:
      return <></>;
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogContainer);
