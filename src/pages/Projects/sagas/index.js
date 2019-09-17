import { all, put, call } from 'redux-saga/effects';
import ProjectsPageActions from '../actions';
import fetch from 'isomorphic-unfetch';

const apiUrl = process.env.REACT_APP_BACKEND_URL + '/projects';

const fetchAllProjects = token =>
  fetch(apiUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(r => r.json());

export function* loadAllProjects(action) {
  const { token } = action;

  const projects = yield call(() => fetchAllProjects(token));

  const actions = projects.data.map(p =>
    put(ProjectsPageActions.addProjectAction(p))
  );

  yield all(actions);
}
