import { createSelector } from 'reselect';
import { map } from 'ramda';

const getProjectsById = state => state.projects.byId;
const getAllProjectIds = state => state.projects.allIds;

const getAllProjects = createSelector(
  getProjectsById,
  getAllProjectIds,
  (byId, allIds) => map(id => byId[id], allIds)
);

export default getAllProjects
