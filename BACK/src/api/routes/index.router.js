import { Router } from 'express';
import userRouter from './users/user.router';
import { setAccessFlags } from '../../middlewares/user.middlewares';

const mainRouter = Router();

mainRouter.use('/user', [setAccessFlags], userRouter);

export default mainRouter;
