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
  const updatedTasks = tasks.concat(id);
  const updatedProject = merge(state[projectId], { tasks: updatedTasks });
  return merge(state, { [projectId]: updatedProject });
};

const concatProjectIdToState = (state, action) => {
  const projectId = action.payload.result;
  return contains(projectId, state) ? state : state.concat(projectId);
};

const addProject = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return addProjectToState(state, action);
    case 'ADD_TASK':
      return addTaskId(state, action);
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
