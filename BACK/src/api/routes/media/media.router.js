import { Router } from 'express';
import { requireAdmin, requireUser } from '../../../middlewares/access.js';
import {
  fetchServiceMedias,
  getAllMedias,
  getMediaById
} from '../../controllers/media/media.controller.js';

const mediaRouter = Router();

mediaRouter
  .get('/', [requireAdmin], getAllMedias)

  // PROXY FOR FRONT
  .get('/fetch', [requireUser], fetchServiceMedias)

  .get('/:mediaId', [requireUser], getMediaById);

export default mediaRouter;
