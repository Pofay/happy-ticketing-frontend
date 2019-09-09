import { call, put } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import ProjectsPageActions from '../../../pages/Projects/actions';

const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/projects`;

const createNewProject = (token, body) =>
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(r => r.json());

export function* submitProjectRequestSaga(action) {
  const { token, projectName } = action.payload;

  yield call(() => createNewProject(token, { name: projectName }));

  yield put(ProjectsPageActions.loadAllProjectsRequest(token));
}
