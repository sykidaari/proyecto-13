import { Router } from 'express';
import { requireAndValidateReqBody } from '../../../../middlewares/middlewares.js';
import {
  getLikedMedias,
  likeMedia,
  unlikeMedia
} from '../../../controllers/user/likedMedias/likedMedias.controller.js';
import { requireSelf } from '../../../../middlewares/access.js';

const likedMediasRouter = Router();

likedMediasRouter
  .get('/', getLikedMedias)

  .patch(
    '/like',
    [requireSelf, requireAndValidateReqBody({ required: ['mediaId'] })],
    likeMedia
  )
  .patch(
    '/unlike',
    [requireSelf, requireAndValidateReqBody({ required: ['mediaId'] })],
    unlikeMedia
  );

export default likedMediasRouter;
