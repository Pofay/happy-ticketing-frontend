import reducer from '../index';
import exampleResponse from './exampleResponse.json';
import ProjectsActions from '../../actions';

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
