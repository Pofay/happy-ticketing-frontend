import Pusher from 'pusher-js';
let socket;

if (process.env.NODE_ENV === 'dev') {
  Pusher.logToConsole = true;

  socket = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
    cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    forceTLS: true
  });
} else {
  socket = new Pusher(process.env.REACT_APP_PROD_PUSHER_KEY, {
    cluster: process.env.REACT_APP_PROD_PUSHER_CLUSTER,
    forceTLS: true
  });
}

export default socket;
