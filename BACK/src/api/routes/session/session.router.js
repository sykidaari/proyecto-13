import { Router } from 'express';
import {
  acceptSessionRequestAndJoinSession,
  cancelSessionRequest,
  getAllSessions,
  getSessionById,
  leaveSession,
  markAllReceivedSessionsRequestsAsSeen,
  rejectSessionRequest,
  sendExistingSessionRequest,
  sendNewSessionRequest
} from '../../controllers/session/session.controller.js';
import {
  requireAdmin,
  requireSessionParticipantOrAdmin,
  setIsSessionParticipant
} from '../../../middlewares/access.js';
import { findSessionById } from '../../../middlewares/middlewares.js';

const sessionRouter = Router({ mergeParams: true });

//! MISSING BODY VALIDATIONS
sessionRouter
  .get('/', [requireAdmin], getAllSessions)

  .patch('/request/send', sendNewSessionRequest)
  .patch('/request/accept', acceptSessionRequestAndJoinSession)
  .patch('/request/cancel', cancelSessionRequest)
  .patch('/request/reject', rejectSessionRequest)

  .patch('/request/mark-all-seen', markAllReceivedSessionsRequestsAsSeen)

  .use('/:sessionId', [
    findSessionById,
    setIsSessionParticipant,
    requireSessionParticipantOrAdmin
  ])
  .get('/:sessionId', getSessionById)
  .patch('/:sessionId/request/send', sendExistingSessionRequest)
  .patch('/:sessionId/leave', leaveSession);

export default sessionRouter;
