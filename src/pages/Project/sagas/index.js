import { take, put, fork, takeEvery } from 'redux-saga/effects';
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

export function* initializeSubscriptionToProject(action) {
  const channelName = action.payload;

  yield fork(subscribeToProjectChanges, channelName);
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

    channel.bind('member-added', data =>
      emitter({
        type: 'member-added',
        payload: data
      })
    );

    return () => {
      channel.unbind('task-added');
      PusherService.unsubscribe();
    };
  });
};
