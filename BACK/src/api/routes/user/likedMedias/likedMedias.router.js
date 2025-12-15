import { Router } from 'express';
import { requireAndValidateReqBody } from '../../../../middlewares/middlewares.js';
import {
  getLikedMedias,
  likeMedia,
  unlikeMedia
} from '../../../controllers/user/likedMedias/likedMedias.controller.js';
import { requireSelf } from '../../../../middlewares/access.js';
import {
  validateFullMediaData,
  validateMediaId
} from '../../../../middlewares/validation.js';

const likedMediasRouter = Router();

likedMediasRouter
  .get('/', getLikedMedias)

  .patch('/like', [requireSelf, validateFullMediaData], likeMedia)
  .patch('/unlike', [requireSelf, validateMediaId], unlikeMedia);

export default likedMediasRouter;
