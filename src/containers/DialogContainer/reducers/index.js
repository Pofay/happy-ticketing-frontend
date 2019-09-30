const INITIAL_STATE = { isOpen: false, dialogType: 'none', dialogData: {} };

const dialogReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_TASK_DIALOG':
      return {
        isOpen: true,
        dialogType: 'ADD_TASK_DIALOG',
        dialogData: action.dialogData
      };
    case 'ADD_PROJECT_DIALOG':
      return {
        isOpen: true,
        dialogType: 'ADD_PROJECT_DIALOG'
      };
    case 'ADD_MEMBER_DIALOG':
      return {
        isOpen: true,
        dialogType: 'ADD_MEMBER_DIALOG',
        dialogData: action.dialogData
      };
    case 'UPDATE_TASK_DIALOG':
      return {
        isOpen: true,
        dialogType: 'UPDATE_TASK_DIALOG',
        dialogData: action.dialogData
      };
    case 'CLOSE_DIALOG':
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default dialogReducer;
