import { combineReducers } from 'redux';
import { contains } from 'ramda'

const addProjectToState = (state, action) => {
  const id = action.payload.result;
  const { projects } = action.payload.entities;
  return { ...state, [id]: projects[id] };
};

const concatProjectIdToState = (state, action) => {
  const projectId = action.payload.result;
  return contains(projectId, state) ? state : state.concat(projectId);
};

const addProject = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return addProjectToState(state, action);
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
