import { Router } from 'express';
import userRouter from './user/user.router.js';
import { setAccessFlags } from '../../middlewares/access.js';

const mainRouter = Router();
mainRouter.use([setAccessFlags]).use('/user', userRouter);

export default mainRouter;
