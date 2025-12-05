const SOCKET_EVENTS = {
  user: { signedIn: 'user:signed-in', signedOut: 'user:signed-out' },
  friends: {
    requests: {
      received: 'friends:request-received',
      accepted: 'friends:new-friend',
      cancelled: 'friends:request-cancelled',
      rejected: 'friends:request-rejected'
    }
  },
  sessions: {
    created: 'sessions:new',
    requests: {
      received: 'sessions:request-received',
      accepted: 'sessions:new-session',
      cancelled: 'sessions:request-cancelled',
      rejected: 'sessions:request-rejected'
    },
    participantsChanges: {
      participantJoined: 'sessions:new-participant',
      participantLeft: 'sessions:participant-left'
    }
  }
};
export default SOCKET_EVENTS;
