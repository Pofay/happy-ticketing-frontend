import createSagaMiddleware from 'redux-saga';
import { all, takeLatest } from 'redux-saga/effects';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import projectsReducer from './pages/Projects/reducers';
import { loadAllProjects } from './pages/Projects/sagas';

const reducers = combineReducers({
  projects: projectsReducer
});

function* rootSaga() {
  yield all([takeLatest('LOAD_ALL_PROJECTS_REQUEST', loadAllProjects)]);
}

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(reducers, applyMiddleware(sagaMiddleware));

  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
