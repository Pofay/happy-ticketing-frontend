export const submitTaskRequest = (
  taskName,
  taskStatus,
  estimatedTime,
  token,
  projectId
) => ({
  type: 'SUBMIT_TASK_REQUEST',
  payload: { taskName, taskStatus, estimatedTime, token, projectId }
});
