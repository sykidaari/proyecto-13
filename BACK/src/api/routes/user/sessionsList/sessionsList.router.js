import { Router } from 'express';
import {
  getSessionsList,
  markSessionInListAsSeen
} from '../../../controllers/user/sessionsList/sessionsList.controller.js';
import { requireSelf } from '../../../../middlewares/access.js';
import { requireAndValidateReqBody } from '../../../../middlewares/middlewares.js';

const sessionsListRouter = Router();

sessionsListRouter
  .get('/', getSessionsList)
  .patch(
    '/mark-all-seen',
    [requireSelf, requireAndValidateReqBody({ required: 'session' })],
    markSessionInListAsSeen
  );

export default sessionsListRouter;
