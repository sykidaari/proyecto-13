import { Router } from 'express';
import { getSessionsList } from '../../../controllers/user/sessionsList/sessionsList.controller.js';

const sessionsListRouter = Router();

sessionsListRouter.get('/', getSessionsList);

export default sessionsListRouter;
