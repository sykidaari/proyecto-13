import { Router } from 'express';
import {
  addMediaToWatchList,
  getWatchList,
  removeMediaFromWatchList
} from '../../../controllers/user/watchList/watchList.controller.js';
import {
  validateFullMediaData,
  validateMediaId
} from '../../../../middlewares/validation.js';
import { saveMedia } from '../../../../middlewares/middlewares.js';

const watchListRouter = Router();

watchListRouter
  .get('/', getWatchList)

  .patch('/media/add', [validateFullMediaData, saveMedia], addMediaToWatchList)
  .patch('/media/remove', [validateMediaId], removeMediaFromWatchList);

export default watchListRouter;
