const INITIAL_STATE = { isOpen: false, dialogType: 'none', dialogData: {} };

const dialogReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_TASK_DIALOG':
      return {
        isOpen: true,
        dialogType: 'ADD_TASK_DIALOG',
        dialogData: action.dialogData
      };
    case 'CLOSE_DIALOG':
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default dialogReducer;
