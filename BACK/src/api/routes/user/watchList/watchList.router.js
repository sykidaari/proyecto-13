import { Router } from 'express';
import {
  addMediaToWatchList,
  getWatchList,
  removeMediaFromWatchList
} from '../../../controllers/user/watchList/watchList.controller.js';
import { validateBody } from '../../../../middlewares/middlewares.js';

const watchListRouter = Router();

watchListRouter
  .get('/', getWatchList)

  .patch('/media', [validateBody(['mediaId'])], addMediaToWatchList)
  .patch(
    '/media/remove',
    [validateBody(['mediaId'])],
    removeMediaFromWatchList
  );

export default watchListRouter;
