import SE from '../../../../config/socket/socketEvents.js';
import requestsService from '../../../../services/internal/requests.service.js';
import Friends from '../../../models/user/friends/friends.model.js';
import { getUserChild } from '../userChildren.controller.js';
import {
  acceptRequest,
  removeRequest,
  sendRequest
} from '../requests/requests.controller.js';

//* GET
export const getFriends = getUserChild({ populateFields: ['friendsList'] });

//* PATCH
export const sendFriendRequest = sendRequest({
  type: 'friends',
  resMessage: 'friend request sent correctly',
  emitMessage: SE.friends.requests.received
});

export const acceptFriendRequest = acceptRequest({
  type: 'friends',
  affectedModel: Friends,
  affectedField: 'friendsList',
  resMessage: 'friend request accepted correctly',
  emitMessage: SE.friends.requests.accepted
});

export const cancelFriendRequest = removeRequest({
  type: 'friends',
  option: 'cancel',
  resMessage: 'friend request cancelled correctly',
  emitMessage: SE.friends.requests.canceled
});

export const rejectFriendRequest = removeRequest({
  type: 'friends',
  option: 'reject',
  resMessage: 'friend request rejected correctly',
  emitMessage: SE.friends.requests.rejected
});

export const removeFriend = '';
