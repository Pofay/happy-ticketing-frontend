import reducer from '../index';
import response from './exampleResponse.json';
import addProjectAction from '../../../globalActions/addProjectAction';
import addTask from '../../../globalActions/addTask';

it('Should return initial State', () => {
  const expected = {
    byId: {},
    allIds: []
  };

  const actual = reducer(undefined, {});

  expect(actual).toEqual(expected);
});

it('Should commit tasks from adding a project', () => {
  const { data } = response;
  const project = data[0];
  const expected = {
    byId: {
      '41e11bed-1244-4142-a3bf-ada37906fc4e': {
        id: '41e11bed-1244-4142-a3bf-ada37906fc4e',
        name: 'Task name',
        status: 'TO IMPLEMENT',
        assignedTo: 'pofay@example.com'
      }
    },
    allIds: ['41e11bed-1244-4142-a3bf-ada37906fc4e']
  };

  const actual = reducer(undefined, addProjectAction(project));

  expect(actual).toEqual(expected);
});

it('Can add plain tasks to state', () => {
  const response = {
    id: '12345df-234123',
    name: 'Make DB',
    projectId: 1,
    assignedTo: 'pofay@example.com',
    status: 'TO IMPLEMENT'
  };

  const expected = {
    byId: {
      '12345df-234123': {
        id: '12345df-234123',
        name: 'Make DB',
        projectId: 1,
        assignedTo: 'pofay@example.com',
        status: 'TO IMPLEMENT'
      }
    },
    allIds: ['12345df-234123']
  };

  const actual = reducer(undefined, addTask(response));

  expect(actual).toEqual(expected);
});
