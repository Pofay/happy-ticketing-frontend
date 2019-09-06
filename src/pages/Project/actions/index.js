// { projectId, tasks } -> Redux Action(type, payload)
import { schema, normalize } from 'normalizr';

const tasks = new schema.Entity('tasks');

export const addTask = data => ({
  type: 'ADD_TASK',
  payload: normalize(data, tasks)
});

export const loadProjectDetails = data => ({
  type: 'LOAD_PROJECT_DETAILS',
  payload: data
});
