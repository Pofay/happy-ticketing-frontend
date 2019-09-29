import { call } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';

const apiUrl = projectId =>
  `${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}/members`;

const addNewMember = (token, projectId, body) =>
  fetch(apiUrl(projectId), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(r => r.json());

export function* submitMemberRequestSaga(action) {
  const { token, projectId, email } = action.payload;

  yield call(() =>
    addNewMember(token, projectId, {
      memberEmail: email
    })
  );
}
