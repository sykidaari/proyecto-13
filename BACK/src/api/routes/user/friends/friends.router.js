import { Router } from 'express';
import {
  findOrCreateByUser,
  requireAndValidateReqBody
} from '../../../../middlewares/middlewares.js';
import {
  acceptFriendRequest,
  cancelFriendRequest,
  getFriends,
  markAllFriendsAsSeen,
  markAllReceivedFriendsRequestsAsSeen,
  rejectFriendRequest,
  removeFriend,
  sendFriendRequest
} from '../../../controllers/user/friends/friends.controller.js';
import { requireSelf } from '../../../../middlewares/access.js';
import { validateOtherUserId } from '../../../../middlewares/validation.js';
import Requests from '../../../models/user/requests/requests.model.js';

const friendsRouter = Router({ mergeParams: true });
const requestRouter = Router({ mergeParams: true });

friendsRouter.use('/request', requestRouter);

friendsRouter
  .get('/', getFriends)
  .patch('/remove', [validateOtherUserId], removeFriend)
  .patch('/mark-all-seen', [requireSelf], markAllFriendsAsSeen);

// REQUESTS
requestRouter
  .patch('/send', [validateOtherUserId], sendFriendRequest)
  .patch('/accept', [validateOtherUserId], acceptFriendRequest)
  .patch('/cancel', [validateOtherUserId], cancelFriendRequest)
  .patch('/reject', [validateOtherUserId], rejectFriendRequest)

  .patch(
    '/mark-all-seen',
    [requireSelf, findOrCreateByUser(Requests, 'requestDoc')],
    markAllReceivedFriendsRequestsAsSeen
  );

export default friendsRouter;
