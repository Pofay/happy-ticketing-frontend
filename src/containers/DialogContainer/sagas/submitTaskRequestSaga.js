import { call } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';

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
  const {
    taskName,
    taskStatus,
    estimatedTime,
    token,
    projectId
  } = action.payload;

  yield call(() =>
    createNewTask(token, projectId, {
      name: taskName,
      status: taskStatus,
      estimatedTime
    })
  );
}
