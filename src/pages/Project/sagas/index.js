import { take, call, put, fork, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { pipe } from 'ramda';
import addTask from '../../globalActions/addTask';
import addMember from '../../globalActions/addMember';
import PusherService from '../services/pusherService';

const putTaskToStore = pipe(
  addTask,
  put
);

const putMemberToStore = pipe(
  addMember,
  put
);

const apiUrl = projectId =>
  `${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}/tasks`;

const deleteTaskInBackend = (token, projectId, body) => {
  fetch(apiUrl(projectId), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(r => console.log(r.status));
};

export function* initializeSubscriptionToProject(action) {
  const channelName = action.payload;

  yield fork(subscribeToProjectChanges, channelName);
}

export function* submitDeleteTaskRequest(action) {
  const { taskId, projectId, token } = action.payload;

  yield call(() =>
    deleteTaskInBackend(token, projectId, {
      id: taskId
    })
  );
}

function* subscribeToProjectChanges(channelName) {
  const projectChanges = createProjectChangesChannel(channelName);

  yield takeEvery(projectChanges, function*(action) {
    switch (action.type) {
      case 'task-added':
        yield putTaskToStore(action.payload);
        break;
      case 'member-added':
        yield putMemberToStore(action.payload);
        break;
      case 'task-updated':
        yield putTaskToStore(action.payload);
        break;
      default:
        break;
    }
  });

  yield take('UNSUBSCRIBE_TO_PROJECT');
  projectChanges.close();
}

const createProjectChangesChannel = channelName => {
  return eventChannel(emitter => {
    const channel = PusherService.subscribe(channelName);

    channel.bind('task-added', data =>
      emitter({
        type: 'task-added',
        payload: data
      })
    );

    channel.bind('task-updated', data =>
      emitter({
        type: 'task-updated',
        payload: data
      })
    );

    channel.bind('member-added', data =>
      emitter({
        type: 'member-added',
        payload: data
      })
    );

    return () => {
      channel.unbind('task-added');
      channel.unbind('task-updated');
      channel.unbind('member-added');
      PusherService.unsubscribe();
    };
  });
};
