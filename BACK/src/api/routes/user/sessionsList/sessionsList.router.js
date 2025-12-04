import { Router } from 'express';
import {
  getSessionsList,
  markSessionInListAsSeen
} from '../../../controllers/user/sessionsList/sessionsList.controller.js';
import { requireSelf } from '../../../../middlewares/access.js';

const sessionsListRouter = Router();

sessionsListRouter
  .get('/', getSessionsList)
  .patch('/mark-all-seen', [requireSelf], markSessionInListAsSeen);

export default sessionsListRouter;
