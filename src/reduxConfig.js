import createSagaMiddleware from 'redux-saga';
import { all, takeLatest } from 'redux-saga/effects';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import projectsReducer from './pages/Projects/reducers';
import tasksReducer from './pages/Project/reducers';
import dialogContainerReducer from './containers/DialogContainer/reducers';
import { loadAllProjects } from './pages/Projects/sagas';
import { initializeSubscriptionToProject } from './pages/Project/sagas';
import DialogContainerSagas from './containers/DialogContainer/sagas';
import membersReducer from './pages/globalReducers/membersReducer';

const reducers = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
  members: membersReducer,
  openedDialog: dialogContainerReducer
});

function* rootSaga() {
  yield all([
    takeLatest('LOAD_ALL_PROJECTS_REQUEST', loadAllProjects),
    takeLatest(
      'SUBMIT_TASK_REQUEST',
      DialogContainerSagas.submitTaskRequestSaga
    ),
    takeLatest(
      'SUBMIT_PROJECT_REQUEST',
      DialogContainerSagas.submitProjectRequestSaga
    ),
    takeLatest(
      'SUBMIT_MEMBER_REQUEST',
      DialogContainerSagas.submitMemberRequestSaga
    ),
    takeLatest('SUBSCRIBE_TO_PROJECT', initializeSubscriptionToProject)
  ]);
}

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(reducers, applyMiddleware(sagaMiddleware));

  store.sagaTask = sagaMiddleware.run(rootSaga);
  //store.subscribe(() => console.table(store.getState()));
  return store;
};

export default configureStore;
