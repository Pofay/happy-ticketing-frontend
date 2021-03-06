import { combineReducers } from 'redux';
import { contains } from 'ramda';
import { merge } from 'ramda';

const addProjectToState = (state, action) => {
  const id = action.payload.result;
  const { projects } = action.payload.entities;
  return merge(state, { [id]: projects[id] });
};

const addTaskId = (state, action) => {
  const { id, projectId } = action.payload;
  const { tasks } = state[projectId];
  const updatedTasks = [...new Set(tasks.concat(id))];
  const updatedProject = merge(state[projectId], { tasks: updatedTasks });
  return merge(state, { [projectId]: updatedProject });
};

const addMemberId = (state, action) => {
  const { id, projectId } = action.payload;
  const { members } = state[projectId];
  const updatedMembers = [...new Set(members.concat(id))];
  const updatedProject = merge(state[projectId], { members: updatedMembers });
  return merge(state, { [projectId]: updatedProject });
};

const concatProjectIdToState = (state, action) => {
  const projectId = action.payload.result;
  return contains(projectId, state) ? state : state.concat(projectId);
};

const deleteTaskId = (state, action) => {
  const { projectId, taskId } = action.payload;
  const project = state[projectId];
  const updatedProject = merge(project, {
    tasks: project.tasks.filter(id => id !== taskId)
  });

  return merge(state, { [projectId]: updatedProject });
};

const addProject = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return addProjectToState(state, action);
    case 'ADD_TASK':
      return addTaskId(state, action);
    case 'DELETE_TASK':
      return deleteTaskId(state, action);
    case 'ADD_MEMBER':
      return addMemberId(state, action);
    default:
      return state;
  }
};

const concatProjectId = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return concatProjectIdToState(state, action);
    default:
      return state;
  }
};

export default combineReducers({
  byId: addProject,
  allIds: concatProjectId
});
