import SE from '../../../../constants/socketEvents.js';
import Friends from '../../../models/user/friends/friends.model.js';
import {
  getUserChild,
  markAllItemsAsSeen,
  removeItemFromUserChildList
} from '../userChildren.controller.js';
import {
  acceptRequest,
  removeRequest,
  sendRequest
} from '../requests/requests.controller.js';
import OK from '../../../../constants/successCodes.js';

//? FOLLOWING AFFECT REQUESTS-MODEL
//* GET
export const getFriends = getUserChild({ populateFields: ['friendsList'] });

//* PATCH
export const sendFriendRequest = sendRequest({
  type: 'friends',
  resMessage: OK.friends.requests.sent,
  emitMessage: SE.friends.requests.received
});

// This works as an "add friend"
export const acceptFriendRequest = acceptRequest({
  type: 'friends',
  AffectedModel: Friends,
  affectedField: 'friendsList',
  resMessage: OK.friends.requests.accepted,
  emitMessage: SE.friends.requests.accepted
});

export const cancelFriendRequest = removeRequest({
  type: 'friends',
  option: 'cancel',
  resMessage: OK.friends.requests.cancelled,
  emitMessage: SE.friends.requests.cancelled
});

export const rejectFriendRequest = removeRequest({
  type: 'friends',
  option: 'reject',
  resMessage: OK.friends.requests.rejected,
  emitMessage: SE.friends.requests.rejected
});

export const markAllReceivedFriendsRequestsAsSeen =
  markAllItemsAsSeen('friends.received');

//? FOLLOWING AFFECT FRIENDS-MODEL
export const removeFriend = removeItemFromUserChildList('friendsList', 'user');
