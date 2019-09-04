import reducer from '../index';
import exampleResponse from './exampleResponse.json';
import { addProjectAction } from '../../actions';

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
      '1': {
        id: 1,
        name: 'ProjectM',
        href: '/v1/projects/1',
        methods: ['GET', 'POST']
      }
    },
    allIds: [1]
  };

  const actual = reducer(undefined, addProjectAction(project));

  expect(actual).toEqual(expected);
});
