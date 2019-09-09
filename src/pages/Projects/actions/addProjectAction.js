import { schema, normalize } from 'normalizr';

const projects = new schema.Entity('projects');

export const addProjectAction = data => ({
  type: 'ADD_PROJECT',
  payload: normalize(data, projects)
});
