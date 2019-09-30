export const submitUpdateTaskRequest = (
  taskName,
  taskStatus,
  assignedTo,
  taskId,
  token,
  projectId
) => ({
  type: 'SUBMIT_UPDATE_TASK_REQUEST',
  payload: { taskName, taskStatus, assignedTo, taskId, token, projectId }
});
