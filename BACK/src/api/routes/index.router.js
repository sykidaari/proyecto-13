import { Router } from 'express';
import userRouter from './user/user.router.js';
import {
  requireSelfOrAdmin,
  setBasicAccessFlags,
  setIsSelf
} from '../../middlewares/access.js';
import sessionRouter from './session/session.router.js';

const mainRouter = Router();
mainRouter
  .use([setBasicAccessFlags])

  .use('/user', userRouter)
  .use('/:userId/session', [setIsSelf, requireSelfOrAdmin], sessionRouter);

export default mainRouter;
