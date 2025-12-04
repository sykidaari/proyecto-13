import { Router } from 'express';
import { validateBody } from '../../../../middlewares/middlewares.js';
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

  .patch('/request/send', validateBody(['otherUserId']), sendFriendRequest)
  .patch('/request/accept', validateBody(['otherUserId']), acceptFriendRequest)
  .patch('/request/cancel', validateBody(['otherUserId']), cancelFriendRequest)
  .patch('/request/reject', validateBody(['otherUserId']), rejectFriendRequest)
  .patch(
    '/request/mark-all-seen',
    [requireSelf],
    markAllReceivedFriendsRequestsAsSeen
  )
  .patch('/remove', validateBody(['userId']), removeFriend);

export default friendsRouter;
