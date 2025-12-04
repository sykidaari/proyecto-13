import { Router } from 'express';
import userRouter from './user/user.router.js';
import {
  requireSelfOrAdmin,
  setAccessFlags,
  setIsSelf
} from '../../middlewares/access.js';
import sessionRouter from './session/session.router.js';

const mainRouter = Router();
mainRouter
  .use([setAccessFlags])

  .use('/user', userRouter)
  .use('/:userId/session', [setIsSelf, requireSelfOrAdmin], sessionRouter);

export default mainRouter;
