export const submitMemberRequest = (email, projectId, token) => ({
  type: 'SUBMIT_MEMBER_REQUEST',
  payload: { email, projectId, token }
});
