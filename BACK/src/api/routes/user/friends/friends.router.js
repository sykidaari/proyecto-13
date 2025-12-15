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
import { validateOtherUserId } from '../../../../middlewares/validation.js';

const friendsRouter = Router();
const requestRouter = Router();

friendsRouter.use('/request', requestRouter);

friendsRouter
  .get('/', getFriends)
  .patch(
    '/remove',
    requireAndValidateReqBody({ required: ['user'] }),
    removeFriend
  );

// REQUESTS
requestRouter
  .patch('/send', [validateOtherUserId], sendFriendRequest)
  .patch('/accept', [validateOtherUserId], acceptFriendRequest)
  .patch('/cancel', [validateOtherUserId], cancelFriendRequest)
  .patch('/reject', [validateOtherUserId], rejectFriendRequest)

  .patch('/mark-all-seen', [requireSelf], markAllReceivedFriendsRequestsAsSeen);

export default friendsRouter;
