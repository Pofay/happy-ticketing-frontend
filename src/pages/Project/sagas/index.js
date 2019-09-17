import { take, call, all, put, fork, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import fetch from 'isomorphic-unfetch';
import { pipe, merge } from 'ramda';
import { addTask } from '../actions';
import PusherService from '../services/pusherService';

const apiUrl = projectId =>
  `${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}`;

const mergeWithAddTask = projectId =>
  pipe(
    merge({ projectId }),
    addTask,
    put
  );

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
  const actions = project.tasks.map(mergeWithAddTask(projectId));

  // Still need to get some members
  yield all(actions);
}

export function* initializeSubscriptionToProject(action) {
  const { channelName, projectId } = action.payload;

  yield fork(subscribeToProjectChanges, channelName, projectId);
}

function* subscribeToProjectChanges(channelName, projectId) {
  const projectChanges = createProjectChangesChannel(channelName);

  yield takeEvery(projectChanges, function*(action) {
    switch (action.type) {
      case 'task-added':
        yield mergeWithAddTask(projectId);
        break;
      default:
        break;
    }
  });

  yield take('UNSUBSCRIBE_TO_PROJECT');
  projectChanges.close();
}

const createProjectChangesChannel = channelName =>
  eventChannel(emitter => {
    const channel = PusherService.subscribe(channelName);

    channel.bind('task-added', function(task) {
      emitter({
        type: 'task-added',
        payload: task
      });
    });

    return () => {
      channel.unbind('task-added');
      PusherService.unsubscribe();
    };
  });
