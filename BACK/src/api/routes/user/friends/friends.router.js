import { Router } from 'express';
import { validateBody } from '../../../../middlewares/middlewares.js';
import {
  acceptFriendRequest,
  getFriends,
  removeFriend,
  sendFriendRequest
} from '../../../controllers/user/friends/friends.controller.js';

const friendsRouter = Router();

friendsRouter
  .get('/', getFriends)

  .patch('/send-request', validateBody(['otherUserId']), sendFriendRequest)
  .patch('/accept-request', validateBody(['otherUserId']), acceptFriendRequest)
  .patch('/cancel-request', validateBody(['otherUserId']))
  .patch('/reject-request', validateBody(['otherUserId']));

export default friendsRouter;
