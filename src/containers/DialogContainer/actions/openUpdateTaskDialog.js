import { curry } from 'ramda';
export const openUpdateTaskDialog = curry(
  (projectId, taskName, taskStatus, assignedTo, taskId) => ({
    type: 'UPDATE_TASK_DIALOG',
    dialogData: { projectId, taskName, taskStatus, assignedTo, taskId }
  })
);
