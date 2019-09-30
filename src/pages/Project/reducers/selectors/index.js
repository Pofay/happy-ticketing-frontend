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

export const makeMapStateToProps = () => {
  const getTasksForProject = makeGetTasksForProject();

  const mapStateToProps = (state, props) => ({
    tasks: getTasksForProject(state, props),
    name: getProjectName(state, props),
    channelName: getChannelName(state, props)
  });

  return mapStateToProps;
};
