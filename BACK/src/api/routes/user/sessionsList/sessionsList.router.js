import { Router } from 'express';
import {
  getSessionsList,
  markAllSessionsInListAsSeen,
  markSessionInListAsSeen,
  setSessionLastSeenAt
} from '../../../controllers/user/sessionsList/sessionsList.controller.js';
import { requireSelf } from '../../../../middlewares/access.js';
import { requireAndValidateReqBody } from '../../../../middlewares/middlewares.js';

const sessionsListRouter = Router();

sessionsListRouter
  .get('/', getSessionsList)
  .patch(
    '/mark-seen',
    [requireSelf, requireAndValidateReqBody({ required: 'session' })],
    markSessionInListAsSeen
  )
  .patch('/mark-all-seen', [requireSelf], markAllSessionsInListAsSeen)
  .patch(
    '/set-last-seen',
    [requireSelf, requireAndValidateReqBody({ required: 'session' })],
    setSessionLastSeenAt
  );

export default sessionsListRouter;
