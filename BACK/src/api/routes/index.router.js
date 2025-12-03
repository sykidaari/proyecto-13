import { Router } from 'express';
import userRouter from './user/user.router.js';
import { setAccessFlags } from '../../middlewares/access.js';
import sessionRouter from './session/session.router.js';

const mainRouter = Router();
mainRouter
  .use([setAccessFlags])

  .use('/user', userRouter)
  .use('/session', sessionRouter);

export default mainRouter;
