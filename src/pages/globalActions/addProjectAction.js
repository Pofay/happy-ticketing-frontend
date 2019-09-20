import { schema, normalize } from 'normalizr';

const member = new schema.Entity('members')
const task = new schema.Entity('tasks')
const projects = new schema.Entity('projects', {
  tasks: [task],
  members: [member]
})

const addProjectAction = data => ({
  type: 'ADD_PROJECT',
  payload: normalize(data, projects)
});

export default addProjectAction
