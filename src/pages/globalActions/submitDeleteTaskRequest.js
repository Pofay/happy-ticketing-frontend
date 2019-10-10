// { token, projectId, taskId }
const submitDeleteTaskRequest = data => ({
  type: 'SUBMIT_DELETE_TASK_REQUEST',
  payload: data
});

export default submitDeleteTaskRequest;
