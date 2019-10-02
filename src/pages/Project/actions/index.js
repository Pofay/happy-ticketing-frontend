// { projectId, tasks } -> Redux Action(type, payload)

export const subscribeToProject = channelName => ({
  type: 'SUBSCRIBE_TO_PROJECT',
  payload: channelName
});

export const unsubscribeToProject = {
  type: 'UNSUBSCRIBE_TO_PROJECT'
};
