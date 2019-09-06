import { call, all, put } from 'redux-saga/effects';
import { addTask } from '../actions';

const apiUrl = projectId =>
  `${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}`;

const fetchProjectDetails = (token, projectId) =>
  fetch(apiUrl(projectId), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(r => r.json());

export function* getProjectDetails(action) {
  const { projectId, token } = action.payload;

  const project = yield call(() => fetchProjectDetails(token, projectId));

  // Should refactor to pointfree style
  const actions = project.tasks
    .map(t => ({ ...t, projectId: projectId }))
    .map(t => put(addTask(t)));

  // Still need to get some members

  yield all(actions);
}
