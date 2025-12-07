import { Router } from 'express';
import {
  acceptSessionRequestAndJoinSession,
  cancelSessionRequest,
  getAllSessions,
  getSessionById,
  getSharedSessions,
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
const requestRouter = Router({ mergeParams: true });

const existingSessionRouter = Router({ mergeParams: true });
const existingSessionRequestRouter = Router({ mergeParams: true });
const interactRouter = Router({ mergeParams: true });

sessionRouter
  .use('/requestRouter', requestRouter)
  .use(
    '/:sessionId',
    [
      findSessionById,
      setIsSessionParticipant,
      requireSessionParticipantOrAdmin
    ],
    existingSessionRouter
  );
existingSessionRouter
  .use('/interactRouter', interactRouter)
  .use('/requestRouter', existingSessionRequestRouter);

sessionRouter
  .get('/', [requireAdmin], getAllSessions)
  .get('/shared/:otherUserId', getSharedSessions);

requestRouter
  .patch('/mark-all-seen', markAllReceivedSessionsRequestsAsSeen)
  .patch(
    '/send',
    [requireAndValidateReqBody({ required: 'otherUserId' })],
    sendSessionRequest
  )
  .patch(
    '/accept',
    [requireAndValidateReqBody({ required: 'otherUserId' })],
    acceptSessionRequestAndJoinSession
  )
  .patch(
    '/cancel',
    [requireAndValidateReqBody({ required: 'otherUserId' })],
    cancelSessionRequest
  )
  .patch(
    '/reject',
    [requireAndValidateReqBody({ required: 'otherUserId' })],
    rejectSessionRequest
  );

existingSessionRouter.get('/', getSessionById).patch('/leave', leaveSession);

interactRouter
  .patch('/proposeMatch', requireAndValidateReqBody({ required: 'mediaId' }))
  .patch('/discardMedia', requireAndValidateReqBody({ required: 'mediaId' }));

existingSessionRequestRouter.patch(
  '/send',
  [
    requireAndValidateReqBody({
      required: ['otherUserId', 'requestGroupId']
    })
  ],
  sendSessionRequest
);

export default sessionRouter;
