import createSagaMiddleware from 'redux-saga';
import { all, takeLatest } from 'redux-saga/effects';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import projectsReducer from './pages/Projects/reducers';
import tasksReducer from './pages/Project/reducers';
import dialogContainerReducer from './containers/DialogContainer/reducers';
import { loadAllProjects } from './pages/Projects/sagas';
import { getProjectDetails } from './pages/Project/sagas';

const reducers = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
  openedDialog: dialogContainerReducer
});

function* rootSaga() {
  yield all([
    takeLatest('LOAD_ALL_PROJECTS_REQUEST', loadAllProjects),
    takeLatest('LOAD_PROJECT_DETAILS', getProjectDetails)
  ]);
}

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(reducers, applyMiddleware(sagaMiddleware));

  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
