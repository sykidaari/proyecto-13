import { Router } from 'express';
import {
  acceptSessionRequestAndJoinSession,
  cancelSessionRequest,
  getAllSessions,
  getSessionById,
  leaveSession,
  markAllReceivedSessionsRequestsAsSeen,
  rejectSessionRequest,
  sendSessionRequest
} from '../../controllers/session/session.controller.js';
import {
  requireAdmin,
  requireSessionParticipantOrAdmin,
  setIsSessionParticipant
} from '../../../middlewares/access.js';
import {
  findSessionById,
  requireAndValidateReqBody
} from '../../../middlewares/middlewares.js';

const sessionRouter = Router({ mergeParams: true });

//! MISSING BODY VALIDATIONS
sessionRouter
  .get('/', [requireAdmin], getAllSessions)

  // FOR NEW SESSION (NOT CREATED YET)
  .patch(
    '/request/send',
    [requireAndValidateReqBody({ required: 'otherUserId' })],
    sendSessionRequest
  )
  .patch(
    '/request/accept',
    [requireAndValidateReqBody({ required: 'otherUserId' })],
    acceptSessionRequestAndJoinSession
  )
  .patch(
    '/request/cancel',
    [requireAndValidateReqBody({ required: 'otherUserId' })],
    cancelSessionRequest
  )
  .patch(
    '/request/reject',
    [requireAndValidateReqBody({ required: 'otherUserId' })],
    rejectSessionRequest
  )

  .patch('/request/mark-all-seen', markAllReceivedSessionsRequestsAsSeen)

  .use('/:sessionId', [
    findSessionById,
    setIsSessionParticipant,
    requireSessionParticipantOrAdmin
  ])
  .get('/:sessionId', getSessionById)

  // FOR ALREADY EXISTING SESSION
  .patch(
    '/:sessionId/request/send',
    [
      requireAndValidateReqBody({
        required: ['otherUserId', 'requestGroupId']
      })
    ],
    sendSessionRequest
  )
  .patch('/:sessionId/leave', leaveSession);

export default sessionRouter;
