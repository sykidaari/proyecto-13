import { Router } from 'express';
import {
  acceptSessionRequestAndJoinSession,
  cancelSessionRequest,
  discardMedia,
  getAllSessions,
  getSessionById,
  getSharedSessions,
  leaveSession,
  markAllReceivedSessionsRequestsAsSeen,
  proposeMatch,
  rejectSessionRequest,
  sendSessionRequest
} from '../../controllers/session/session.controller.js';
import {
  requireAdmin,
  requireSelf,
  requireSessionParticipantOrAdmin,
  setIsSessionParticipant
} from '../../../middlewares/access.js';
import {
  findSessionById,
  requireAndValidateReqBody
} from '../../../middlewares/middlewares.js';

//* COMMON MIDDLEWARES
const validateOtherUserId = requireAndValidateReqBody({
  required: 'otherUserId'
});
const validateMediaId = requireAndValidateReqBody({ required: 'mediaId' });
//*

const sessionRouter = Router({ mergeParams: true });
const requestRouter = Router({ mergeParams: true });

const existingSessionRouter = Router({ mergeParams: true });
const existingSessionRequestRouter = Router({ mergeParams: true });
const interactRouter = Router({ mergeParams: true });

sessionRouter
  .use('/request', requestRouter)
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
  .use('/interact', [requireSelf], interactRouter)
  .use('/request', existingSessionRequestRouter);

sessionRouter
  .get('/', [requireAdmin], getAllSessions)
  .get('/shared/:otherUserId', getSharedSessions);

requestRouter
  .patch('/mark-all-seen', markAllReceivedSessionsRequestsAsSeen)
  .patch(
    '/send',
    [
      requireAndValidateReqBody({
        required: 'otherUserId',
        optional: [
          'additionalPayload.sessionName',

          'additionalPayload.includedMedia.mediaType',
          'additionalPayload.includedMedia.genres',
          'additionalPayload.sessionParameters.includedMedia.keyWord',

          'additionalPayload.includedMedia.availability.services',
          'additionalPayload.includedMedia.availability.country'
        ]
      })
    ],
    sendSessionRequest
  )
  .patch('/accept', [validateOtherUserId], acceptSessionRequestAndJoinSession)
  .patch('/cancel', [validateOtherUserId], cancelSessionRequest)
  .patch('/reject', [validateOtherUserId], rejectSessionRequest);

existingSessionRouter.get('/', getSessionById).patch('/leave', leaveSession);

interactRouter
  .patch('/propose-match', [validateMediaId], proposeMatch)
  .patch('/discard', [validateMediaId], discardMedia);

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
