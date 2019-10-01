import { call } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';

const apiUrl = projectId =>
  `${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}/tasks`;

const updateProject = (token, projectId, body) =>
  fetch(apiUrl(projectId), {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(r => r.json());

export function* submitUpdateTaskRequestSaga(action) {
  const {
    taskName,
    taskStatus,
    assignedTo,
    taskId,
    token,
    projectId
  } = action.payload;

  yield call(() =>
    updateProject(token, projectId, {
      id: taskId,
      name: taskName,
      status: taskStatus,
      assignedTo
    })
  );
}
