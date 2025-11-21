import { Router } from 'express';
import userRouter from './user/user.router.js';

const mainRouter = Router();

mainRouter.use('/user', userRouter);

export default mainRouter;
