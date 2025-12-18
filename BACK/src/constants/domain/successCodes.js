const SUCCESS_CODES = {
  user: {
    registered: 'USER_REGISTERED_SUCCESS',
    loggedIn: 'USER_LOGGED_IN_SUCCESS',

    profilePictureUpdated: 'USER_PROFILE_PICTURE_UPDATED_SUCCESS',
    profilePictureDeleted: 'USER_PROFILE_PICTURE_DELETED_SUCCESS',

    updated: 'USER_UPDATED_SUCCESS',
    passwordChanged: 'USER_PASSWORD_CHANGED_SUCCESS',
    deleted: 'USER_DELETED_SUCCESS'
  },
  sessions: {
    requests: {
      sent: 'SESSION_REQUEST_SENT_SUCCESS',
      accepted: 'SESSION_REQUEST_ACCEPTED_SUCCESS',
      cancelled: 'SESSION_REQUEST_CANCELLED_SUCCESS',
      rejected: 'SESSION_REQUEST_REJECTED_SUCCESS',
      allMarkedSeen: 'SESSION_REQUESTS_MARKED_SEEN_SUCCESS'
    },

    general: {
      left: 'SESSION_LEFT_SUCCESS',
      deleted: 'SESSION_LEFT_AND_DELETED_SUCCESS'
    }
  },
  friends: {
    requests: {
      sent: 'FRIEND_REQUEST_SENT_SUCCESS',
      accepted: 'FRIEND_REQUEST_ACCEPTED_SUCCESS',
      cancelled: 'FRIEND_REQUEST_CANCELLED_SUCCESS',
      rejected: 'FRIEND_REQUEST_REJECTED_SUCCESS',
      allMarkedSeen: 'FRIEND_REQUESTS_MARKED_SEEN_SUCCESS'
    },

    list: {
      removed: 'FRIEND_REMOVED_SUCCESS'
    }
  },

  userChild: {
    get: 'USER_CHILD_FETCH_SUCCESS',
    itemAdded: 'USER_CHILD_ITEM_ADDED_SUCCESS',
    itemRemoved: 'USER_CHILD_ITEM_REMOVED_SUCCESS',
    itemMarkedSeen: 'USER_CHILD_ITEM_MARKED_SEEN_SUCCESS',
    allMarkedSeen: 'USER_CHILD_ALL_ITEMS_MARKED_SEEN_SUCCESS'
  }
};

export default SUCCESS_CODES;
