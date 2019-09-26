import { combineReducers } from 'redux';
import { merge } from 'ramda';

const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});

const addMembers = (state, action) => {
  const projectId = action.payload.result;
  const memberIds = action.payload.entities.projects[projectId].members;
  const { members } = action.payload.entities;

  const membersToBeAdded = memberIds.map(id => members[id]);
  return merge(state, arrayToObject(membersToBeAdded, 'id'));
};

const memberById = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return addMembers(state, action);
    default:
      return state;
  }
};

const appendIds = (state, action) => {
  const id = action.payload.result;
  const project = action.payload.entities.projects[id];
  const memberIds = project.members;
  const updatedMemberIds = state.concat(memberIds);
  return [...new Set(updatedMemberIds)];
};

const allMembers = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return appendIds(state, action);
    default:
      return state;
  }
};

export default combineReducers({
  byId: memberById,
  allIds: allMembers
});
