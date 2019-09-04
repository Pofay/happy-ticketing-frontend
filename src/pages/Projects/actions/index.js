import { schema, normalize } from 'normalizr';

const projects = new schema.Entity('projects');

export const addProjectAction = data => ({
  type: 'ADD_PROJECT',
  payload: normalize(data, projects)
});

export const loadAllProjectsRequest = token => ({
  type: 'LOAD_ALL_PROJECTS_REQUEST',
  token: token
});
