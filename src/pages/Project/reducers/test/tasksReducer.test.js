import reducer from '../index';
import response from './example-response.json';
import { addTask } from '../../actions';

it('Should return initial State', () => {
  const expected = {
    byId: {},
    allIds: []
  };

  const actual = reducer(undefined, {});

  expect(actual).toEqual(expected);
});

it('Should add Project Id to Tasks', () => {
  const expected = {
    byId: {
      '1': {
        id: 1,
        name: 'Task name',
        projectId: 1,
        status: 'TO IMPLEMENT',
        assignedTo: 'pofay@example.com'
      }
    },
    allIds: [1]
  };

  const actual = reducer(
    undefined,
    addTask({ ...response.tasks[0], projectId: response.id })
  );

  expect(actual).toEqual(expected);
});
