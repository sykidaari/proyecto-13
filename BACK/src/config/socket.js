import SE from '../constants/domain/socketEvents.js';

export let io;

export const setupSocket = (serverIo) => {
  io = serverIo;

  io.on('connection', (socket) => {
    console.log('socket connected:', socket.id);

    socket.on(SE.user.signedIn, (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    });

    socket.on(SE.user.signedOut, (userId) => {
      socket.leave(userId);
      console.log(`User ${userId} left their room`);
    });
  });
};
