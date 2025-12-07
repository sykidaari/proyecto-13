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
  .patch(
    '/send',
    requireAndValidateReqBody({ required: ['otherUserId'] }),
    sendFriendRequest
  )
  .patch(
    '/accept',
    requireAndValidateReqBody({ required: ['otherUserId'] }),
    acceptFriendRequest
  )
  .patch(
    '/cancel',
    requireAndValidateReqBody({ required: ['otherUserId'] }),
    cancelFriendRequest
  )
  .patch(
    '/reject',
    requireAndValidateReqBody({ required: ['otherUserId'] }),
    rejectFriendRequest
  )
  .patch('/mark-all-seen', [requireSelf], markAllReceivedFriendsRequestsAsSeen);

export default friendsRouter;
