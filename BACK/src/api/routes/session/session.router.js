import { Router } from 'express';
import {
  getAllSessions,
  getSessionById
} from '../../controllers/session/session.controller.js';
import {
  requireAdmin,
  requireSessionParticipantOrAdmin,
  setIsSessionParticipant
} from '../../../middlewares/access.js';

const sessionRouter = Router({ mergeParams: true });

// !  NEED TO FIX
sessionRouter
  .get('/', [requireAdmin], getAllSessions)

  .use('/:id', [setIsSessionParticipant, requireSessionParticipantOrAdmin])
  .get('/:id', getSessionById);

export default sessionRouter;
