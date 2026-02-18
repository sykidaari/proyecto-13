import SE from '../../../../constants/domain/socketEvents.js';
import Friends from '../../../models/user/friends/friends.model.js';
import {
  getUserChild,
  markAllItemsAsSeen
} from '../userChildren.controller.js';
import {
  acceptRequest,
  removeRequest,
  sendRequest
} from '../requests/requests.controller.js';
import OK from '../../../../constants/domain/successCodes.js';
import withTransaction from '../../../../utils/transactionWrapper.js';
import ERR from '../../../../constants/domain/errorCodes.js';
import User from '../../../models/user/user.model.js';
import { emit } from '../../../../utils/controllerUtils.js';

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
export const removeFriend = async (req, res, next) => {
  const {
    doc: currentUserDoc,
    params: { userId: currentUserId },
    body: { otherUserId }
  } = req;

  try {
    await withTransaction(async (ses) => {
      currentUserDoc.$session(ses);

      currentUserDoc.friendsList.pull({ user: otherUserId });
      await currentUserDoc.save({ session: ses });

      const otherUserDoc = await Friends.findById(otherUserId).session(ses);

      if (otherUserDoc) {
        otherUserDoc.friendsList.pull({ user: currentUserId });
        await otherUserDoc.save({ session: ses });
      }
    });
    emit({ from: currentUserId, to: otherUserId }, SE.friends.removed);

    return res.status(200).json({
      message: OK.userChild.itemRemoved,
      user: otherUserId,
      field: 'friendsList'
    });
  } catch (err) {
    next(err);
  }
};
