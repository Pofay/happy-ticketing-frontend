import { call, put, all } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import { addTask } from '../../../pages/Project/actions';

const apiUrl = projectId =>
  `${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}/tasks`;

const createNewTask = (token, projectId, body) =>
  fetch(apiUrl(projectId), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
     'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(r => r.json());

export function* submitTaskRequestSaga(action) {
  // post to API url

  const { taskName, taskStatus, token, projectId } = action.payload;

  const updatedProject = yield call(() =>
    createNewTask(token, projectId, {
      name: taskName,
      status: taskStatus
    })
  );

  const actions = updatedProject.tasks
    .map(t => ({ ...t, projectId: projectId }))
    .map(t => put(addTask(t)));

  yield all(actions);
}
