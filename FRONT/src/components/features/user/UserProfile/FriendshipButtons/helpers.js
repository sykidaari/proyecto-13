export const createRelationshipConfig = (texts) => ({
  friend: {
    className: '',
    text: texts.removeFriend,
    action: 'remove'
  },
  sent: {
    className: 'btn-warning',
    text: texts.cancelFriendRequest,
    action: 'cancelRequest'
  },
  received: {
    className: 'btn-success',
    text: texts.acceptFriendship,
    action: 'acceptRequest',
    secondary: {
      className: 'btn-warning',
      text: texts.rejectFriendship,
      action: 'rejectRequest'
    }
  },
  none: {
    className: 'btn-info',
    text: texts.requestFriendship,
    action: 'sendRequest'
  }
});
