import reducer from '../index';
import exampleResponse from './exampleResponse.json';
import ProjectsActions from '../../actions';
import addTask from '../../../globalActions/addTask';
import { pipe } from 'ramda';

it('Returns Initial State', () => {
  const expected = {
    byId: {},
    allIds: []
  };

  const actual = reducer(undefined, {});

  expect(actual).toEqual(expected);
});

it('Should normalize all loaded Projects', () => {
  const { data } = exampleResponse;
  const project = data[0];
  const expected = {
    byId: {
      1: {
        id: 1,
        name: 'ProjectM',
        members: [1, 2],
        channelName: '213242134@ProjectM',
        tasks: ['41e11bed-1244-4142-a3bf-ada37906fc4e']
      }
    },
    allIds: [1]
  };

  const actual = reducer(undefined, ProjectsActions.addProjectAction(project));

  expect(actual).toEqual(expected);
});

it('When a task is added, its id is added to projects tasks id array', () => {
  const { data } = exampleResponse;
  const project = data[0];
  const expected = {
    byId: {
      1: {
        id: 1,
        name: 'ProjectM',
        members: [1, 2],
        channelName: '213242134@ProjectM',
        tasks: ['41e11bed-1244-4142-a3bf-ada37906fc4e', '123456fgz-3435op']
      }
    },
    allIds: [1]
  };
  const payload = {
    id: '123456fgz-3435op',
    name: 'Refactor Redux',
    projectId: 1,
    status: 'TO IMPLEMENT',
    assignedTo: 'pofire@example.com'
  };

  const newState = reducer(
    undefined,
    ProjectsActions.addProjectAction(project)
  );
  const actual = reducer(newState, addTask(payload));

  expect(actual).toEqual(expected);
});
