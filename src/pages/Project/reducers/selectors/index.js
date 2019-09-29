import { createSelector } from 'reselect';

const getTasksById = state => state.tasks.byId;

const getProjectTaskIds = (state, props) => {
  const projectId = props.match.params.id;
  return state.projects.byId[projectId].tasks;
};

const getProjectName = (state, props) => {
  const projectId = props.match.params.id;
  return state.projects.byId[projectId].name;
};

const getChannelName = (state, props) => {
  const projectId = props.match.params.id;
  return state.projects.byId[projectId].channelName;
};

const makeGetTasksForProject = () =>
  createSelector(
    [getTasksById, getProjectTaskIds],
    (allTasks, projectTasksIds) => projectTasksIds.map(id => allTasks[id])
  );

const getMembers = state => state.members.byId;

const getMemberIds = (state, props) => {
  const projectId = props.match.params.id;
  return state.projects.byId[projectId].members;
};

const makeGetMembersForProject = () =>
  createSelector(
    [getMembers, getMemberIds],
    (members, memberIds) => memberIds.map(id => members[id])
  );

export const makeMapStateToProps = () => {
  const getTasksForProject = makeGetTasksForProject();
  const getMembersForProject = makeGetMembersForProject();

  const mapStateToProps = (state, props) => ({
    tasks: getTasksForProject(state, props),
    name: getProjectName(state, props),
    channelName: getChannelName(state, props),
    members: getMembersForProject(state, props)
  });

  return mapStateToProps;
};
