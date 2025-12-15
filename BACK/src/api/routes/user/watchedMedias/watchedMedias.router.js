import { Router } from 'express';
import { requireAndValidateReqBody } from '../../../../middlewares/middlewares.js';
import {
  getWatchedMedias,
  markMediaAsUnwatched,
  markMediaAsWatched
} from '../../../controllers/user/watchedMedias/watchedMedias.controller.js';
import { requireSelf } from '../../../../middlewares/access.js';
import {
  validateFullMediaData,
  validateMediaId
} from '../../../../middlewares/validation.js';

const watchedMediasRouter = Router();

watchedMediasRouter
  .get('/', getWatchedMedias)

  .patch('/media/add', [requireSelf, validateFullMediaData], markMediaAsWatched)
  .patch('/media/remove', [requireSelf, validateMediaId], markMediaAsUnwatched);

export default watchedMediasRouter;
