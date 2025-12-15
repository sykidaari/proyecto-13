import { Router } from 'express';
import userRouter from './user/user.router.js';
import {
  requireSelfOrAdmin,
  setBasicAccessFlags,
  setIsSelf
} from '../../middlewares/access.js';
import sessionRouter from './session/session.router.js';
import mediaRouter from './media/media.router.js';
import topShowsImgsRouter from './topShowsImgs/topShowsImgs.router.js';

const mainRouter = Router();
mainRouter
  .use([setBasicAccessFlags])

  .use('/user', userRouter)
  .use('/:userId/session', [setIsSelf, requireSelfOrAdmin], sessionRouter)
  .use('/media', mediaRouter)
  .use('top', topShowsImgsRouter);

export default mainRouter;
