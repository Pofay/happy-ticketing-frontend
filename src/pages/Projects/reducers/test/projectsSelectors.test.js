import getAllProjects from '../selectors';

it('Should return mapped projects in an array', () => {
  const expected = [
    {
      id: 1,
      name: 'ProjectM',
      href: '/v1/projects/1',
      methods: ['GET', 'POST']
    }
  ];

  const state = {
    projects: {
      byId: {
        '1': {
          id: 1,
          name: 'ProjectM',
          href: '/v1/projects/1',
          methods: ['GET', 'POST']
        }
      },
      allIds: [1]
    }
  };

  const actual = getAllProjects(state);

  expect(actual).toEqual(expected);
});
