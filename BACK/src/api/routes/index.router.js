import { Router } from 'express';
import userRouter from './users/user.router.js';
import { setAccessFlags } from '../../middlewares/user.middlewares.js';

const mainRouter = Router();

mainRouter.use('/user', userRouter);

export default mainRouter;
