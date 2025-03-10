import {io} from 'socket.io-client';

const SOCKET_BASE_URL = 'ws://chat-api-k4vi.onrender.com';

let socket;

export const connectToSocket = url => {
  socket = io(url);

  socket.on('connect', () => {
    console.log('WebSocket connected');
  });

  socket.on('disconnect', () => {
    console.log('WebSocket disconnected');
  });

  socket.on('message', message => {
    console.log('Received message:', message);
    // Handle incoming messages here (e.g., update state)
  });
};

export const sendMessage = content => {
  console.log('content', content);

  if (socket) {
    try {
      socket.emit('message', {event: 'message', content});
    } catch (error) {
      console.log('sfs', error);
    } finally {
      console.log('finally!');
    }
  } else {
    console.log('WebSocket not connected');
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};
