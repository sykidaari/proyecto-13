import { Router } from 'express';
import { requireAdmin, requireUser } from '../../../middlewares/access.js';
import {
  fetchServiceMedias,
  getAllMedias,
  getMediaById
} from '../../controllers/media/media.controller.js';
import rateLimit from '../../../middlewares/rateLimit.js';

const mediaRouter = Router();

mediaRouter
  .get('/', [requireAdmin], getAllMedias)

  // PROXY FOR FRONT
  .get(
    '/fetch',
    [requireUser, rateLimit.streamingAvailabilityDemo],
    fetchServiceMedias
  )

  .get('/:mediaId', [requireUser], getMediaById);

export default mediaRouter;
