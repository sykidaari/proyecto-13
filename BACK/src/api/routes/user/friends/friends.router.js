import { Router } from 'express';
import { validateBody } from '../../../../middlewares/middlewares.js';
import {
  acceptFriendRequest,
  getFriends,
  removeFriend
} from '../../../controllers/user/friends/friends.controller.js';

const friendsRouter = Router();

friendsRouter
  .get('/', getFriends)

  .patch('/', validateBody(['friendId']), acceptFriendRequest)
  .patch('/', validateBody(['friendId']), removeFriend);

export default friendsRouter;
