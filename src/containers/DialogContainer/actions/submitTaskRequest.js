export const submitTaskRequest = (taskName, taskStatus, token, projectId) => ({
  type: 'SUBMIT_TASK_REQUEST',
  payload: { taskName, taskStatus, token, projectId }
});
