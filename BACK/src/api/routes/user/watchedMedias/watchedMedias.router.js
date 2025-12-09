import { Router } from 'express';
import { requireAndValidateReqBody } from '../../../../middlewares/middlewares.js';
import {
  getWatchedMedias,
  markMediaAsUnwatched,
  markMediaAsWatched
} from '../../../controllers/user/watchedMedias/watchedMedias.controller.js';
import { requireSelf } from '../../../../middlewares/access.js';

const watchedMediasRouter = Router();

watchedMediasRouter
  .get('/', getWatchedMedias)

  .patch(
    '/media/add',
    [requireSelf, requireAndValidateReqBody({ required: ['mediaId'] })],
    markMediaAsWatched
  )
  .patch(
    '/media/remove',
    [requireSelf, requireAndValidateReqBody({ required: ['mediaId'] })],
    markMediaAsUnwatched
  );

export default watchedMediasRouter;
