export const submitProjectRequest = (token, projectName) => ({
  type: 'SUBMIT_PROJECT_REQUEST',
  payload: { token, projectName }
});
