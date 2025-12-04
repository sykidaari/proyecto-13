import { Router } from 'express';
import {
  addMediaToWatchList,
  getWatchList,
  removeMediaFromWatchList
} from '../../../controllers/user/watchList/watchList.controller.js';
import { requireAndValidateReqBody } from '../../../../middlewares/middlewares.js';

const watchListRouter = Router();

watchListRouter
  .get('/', getWatchList)

  .patch(
    '/media/add',
    [requireAndValidateReqBody({ required: ['mediaId'] })],
    addMediaToWatchList
  )
  .patch(
    '/media/remove',
    [requireAndValidateReqBody({ required: ['mediaId'] })],
    removeMediaFromWatchList
  );

export default watchListRouter;
