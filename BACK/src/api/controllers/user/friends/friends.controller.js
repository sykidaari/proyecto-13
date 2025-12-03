import SE from '../../../../config/socket/socketEvents.js';
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

//? FOLLOWING AFFECT REQUESTS-MODEL
//* GET
export const getFriends = getUserChild({ populateFields: ['friendsList'] });

//* PATCH
export const sendFriendRequest = sendRequest({
  type: 'friends',
  resMessage: 'friend request sent correctly',
  emitMessage: SE.friends.requests.received
});

// This works as an "add friend"
export const acceptFriendRequest = acceptRequest({
  type: 'friends',
  AffectedModel: Friends,
  affectedField: 'friendsList',
  resMessage: 'friend request accepted correctly',
  emitMessage: SE.friends.requests.accepted
});

export const cancelFriendRequest = removeRequest({
  type: 'friends',
  option: 'cancel',
  resMessage: 'friend request cancelled correctly',
  emitMessage: SE.friends.requests.cancelled
});

export const rejectFriendRequest = removeRequest({
  type: 'friends',
  option: 'reject',
  resMessage: 'friend request rejected correctly',
  emitMessage: SE.friends.requests.rejected
});

export const markAllReceivedFriendsRequestsAsSeen =
  markAllItemsAsSeen('friends.received');

//? FOLLOWING AFFECT FRIENDS-MODEL
export const removeFriend = removeItemFromUserChildList(
  'friendsList',
  'userId'
);
