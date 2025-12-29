import { Router } from 'express';
import { refreshAccessToken } from '../../controllers/userAccessSession/userAccessSession.controller.js';

const userAccessSessionRouter = Router();

userAccessSessionRouter.post('/', refreshAccessToken);

export default userAccessSessionRouter;
