import { getAllTasks } from '../selectors';

it('Should map given state to list', () => {
  const expected = [
    {
      id: 1,
      projectId: 1,
      name: 'Scratch Programming',
      status: 'TO IMPLEMENT',
      assignedTo: 'pofay@example.com'
    }
  ];

  const state = {
    tasks: {
      byId: {
        '1': {
          id: 1,
          projectId: 1,
          name: 'Scratch Programming',
          status: 'TO IMPLEMENT',
          assignedTo: 'pofay@example.com'
        }
      },
      allIds: [1]
    }
  };

  const actual = getAllTasks(state);

  expect(actual).toEqual(expected);
});
