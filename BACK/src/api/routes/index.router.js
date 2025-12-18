import { Router } from 'express';
import userRouter from './user/user.router.js';
import {
  requireSelfOrAdmin,
  requireUser,
  setBasicAccessFlags,
  setIsSelf
} from '../../middlewares/access.js';
import sessionRouter from './session/session.router.js';
import mediaRouter from './media/media.router.js';
import topShowsImgsRouter from './topShowsImgs/topShowsImgs.router.js';
import rateLimit from '../../middlewares/rateLimit.js';

const mainRouter = Router();
mainRouter
  .use([rateLimit.general, setBasicAccessFlags])

  .use('/user', userRouter)
  .use('/:userId/session', [setIsSelf, requireSelfOrAdmin], sessionRouter)
  .use('/media', [requireUser], mediaRouter)
  .use('/top', [rateLimit.streamingAvailabilityDemo], topShowsImgsRouter);

export default mainRouter;
