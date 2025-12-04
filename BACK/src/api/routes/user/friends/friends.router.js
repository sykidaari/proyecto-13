import { Router } from 'express';
import { requireAndValidateReqBody } from '../../../../middlewares/middlewares.js';
import {
  acceptFriendRequest,
  cancelFriendRequest,
  getFriends,
  markAllReceivedFriendsRequestsAsSeen,
  rejectFriendRequest,
  removeFriend,
  sendFriendRequest
} from '../../../controllers/user/friends/friends.controller.js';
import { requireSelf } from '../../../../middlewares/access.js';

const friendsRouter = Router();

friendsRouter
  .get('/', getFriends)

  .patch(
    '/request/send',
    requireAndValidateReqBody({ required: ['otherUserId'] }),
    sendFriendRequest
  )
  .patch(
    '/request/accept',
    requireAndValidateReqBody({ required: ['otherUserId'] }),
    acceptFriendRequest
  )
  .patch(
    '/request/cancel',
    requireAndValidateReqBody({ required: ['otherUserId'] }),
    cancelFriendRequest
  )
  .patch(
    '/request/reject',
    requireAndValidateReqBody({ required: ['otherUserId'] }),
    rejectFriendRequest
  )
  .patch(
    '/request/mark-all-seen',
    [requireSelf],
    markAllReceivedFriendsRequestsAsSeen
  )
  .patch(
    '/remove',
    requireAndValidateReqBody({ required: ['user'] }),
    removeFriend
  );

export default friendsRouter;
