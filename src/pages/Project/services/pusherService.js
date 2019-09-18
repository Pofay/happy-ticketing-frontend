import Pusher from 'pusher-js';

if (process.env.NODE_ENV === 'dev') Pusher.logToConsole = true;

const socket = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
  cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  forceTLS: true
});

export default socket;
