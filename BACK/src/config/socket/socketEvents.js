const SOCKET_EVENTS = {
  user: { signedIn: 'user:signed-in', signedOut: 'user:signed-out' },
  friends: {
    requests: {
      received: 'friends:request-received',
      accepted: 'friends:new-friend',
      canceled: 'friends:request-cancelled',
      rejected: 'friends:request-rejected'
    }
  }
};

export default SOCKET_EVENTS;
