import { curry } from 'ramda';
export const openAddTaskDialog = curry((projectId, initialTaskStatus) => ({
  type: 'ADD_TASK_DIALOG',
  dialogData: { projectId, initialTaskStatus }
}));
