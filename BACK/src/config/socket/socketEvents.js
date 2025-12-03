const SOCKET_EVENTS = {
  user: { signedIn: 'user:signed-in', signedOut: 'user:signed-out' },
  friends: {
    requests: {
      received: 'friends:request-received',
      accepted: 'friends:new-friend',
      canceled: 'friends:request-cancelled',
      rejected: 'friends:request-rejected'
    }
  },
  sessions: {
    requests: {
      received: 'sessions:request-received',
      accepted: 'sessions:new-session',
      canceled: 'sessions:request-cancelled',
      rejected: 'sessions:request-rejected'
    }
  }
};
export default SOCKET_EVENTS;
