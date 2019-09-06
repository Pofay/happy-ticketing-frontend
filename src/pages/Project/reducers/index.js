import { combineReducers } from 'redux';
import { contains } from 'ramda';

const addTask = (state, action) => {
  const id = action.payload.result;
  const { tasks } = action.payload.entities;
  return { ...state, [id]: tasks[id] };
};

const appendTaskId = (state, action) => {
  const id = action.payload.result;
  return contains(id, state) ? state : state.concat(id);
};

const taskById = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return addTask(state, action);
    default:
      return state;
  }
};

const taskIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return appendTaskId(state, action);
    default:
      return state;
  }
};

export default combineReducers({
  byId: taskById,
  allIds: taskIds
});
