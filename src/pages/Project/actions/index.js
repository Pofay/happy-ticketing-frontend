// { projectId, tasks } -> Redux Action(type, payload)

export const loadProjectDetails = data => ({
  type: 'LOAD_PROJECT_DETAILS',
  payload: data
});

export const subscribeToProject = payload => ({
  type: 'SUBSCRIBE_TO_PROJECT',
  payload: payload
});

export const unsubscribeToProject = {
  type: 'UNSUBSCRIBE_TO_PROJECT'
};
