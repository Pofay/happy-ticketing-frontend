import { combineReducers } from 'redux';
import { contains, merge } from 'ramda';

const addTask = (state, action) => {
  const { id } = action.payload;
  return merge(state, { [id]: action.payload });
};

const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});

const addTasks = (state, action) => {
  const projectId = action.payload.result;
  const taskIds = action.payload.entities.projects[projectId].tasks;
  const { tasks } = action.payload.entities;

  const tasksToBeAdded = taskIds.map(id => tasks[id]);
  return merge(state, arrayToObject(tasksToBeAdded, 'id'));
};

const appendTaskIds = (state, action) => {
  const id = action.payload.result;
  const project = action.payload.entities.projects[id];
  const { tasks } = project;
  const taskIds = state.concat(tasks);
  return [...new Set(taskIds)];
};

const appendTaskId = (state, action) => {
  const { id } = action.payload;
  return contains(id, state) ? state : state.concat(id);
};

const taskById = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return addTask(state, action);
    case 'ADD_PROJECT':
      return addTasks(state, action);
    default:
      return state;
  }
};

const taskIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return appendTaskId(state, action);
    case 'ADD_PROJECT':
      return appendTaskIds(state, action);
    default:
      return state;
  }
};

export default combineReducers({
  byId: taskById,
  allIds: taskIds
});
