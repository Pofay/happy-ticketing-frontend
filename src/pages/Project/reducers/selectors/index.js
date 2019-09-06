import { createSelector } from 'reselect';

const getTasksById = state => state.tasks.byId;
const getTaskIds = state => state.tasks.allIds;

export const getAllTasks = createSelector(
  getTasksById,
  getTaskIds,
  (byId, allIds) => allIds.map(id => byId[id])
);


