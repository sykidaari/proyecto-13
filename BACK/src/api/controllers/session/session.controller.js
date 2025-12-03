import SE from '../../../config/socket/socketEvents.js';
import { customError } from '../../../utils/controllerUtils.js';
import Session from '../../models/session/session.model.js';
import SessionsList from '../../models/user/sessionsList/sessionsList.model.js';
import {
  acceptRequest,
  sendRequest
} from '../user/requests/requests.controller.js';
import crypto from 'crypto';

//* GET

//? ADMIN ONLY
export const getAllSessions = async (req, res, next) => {
  try {
    const sessions = await Session.find().lean();

    return res.status(200).json(sessions);
  } catch (err) {
    next(err);
  }
};

//ID COMES FROM MIDDLEWARE
export const getSessionById = async (req, res, next) => {
  const { session } = req;

  try {
    return res.status(200).json(session);
  } catch (err) {
    next(err);
  }
};

export const sendSessionRequest = sendRequest({
  type: 'sessions',
  resMessage: 'session invitation sent correctly',
  emitMessage: SE.sessions.requests.received,
  isUnique: false,
  allowMultiple: true,
  multipleLimit: 5,
  beforeSend: () => crypto.randomUUID()
});

export const acceptSessionRequest = acceptRequest({
  type: 'sessions',
  affectedModel: SessionsList,
  affectedField: 'sessionsList',
  resMessage: 'session request accepted correctly',
  emitMessage: SE.sessions.requests.accepted,

  sideEffect: async (
    {
      senderDoc,
      senderId,
      recipientId,
      affectedSenderDoc,
      affectedRecipientDoc,
      affectedSenderField,
      affectedRecipientField,
      requestId
    },
    session
  ) => {
    const request = senderDoc.sessions.sent.id(requestId);
    if (!request)
      throw customError(404, 'session request not found during acceptance');

    const { sessionParameters, requestGroupId } = request;

    let sessionDoc = await Session.findOne({ requestGroupId }).session(session);

    if (!sessionDoc) {
      const [newSession] = await Session.create(
        [
          {
            sessionName: sessionParameters.sessionName,
            includedMedia: sessionParameters.includedMedia,
            participants: [{ user: senderId }, { user: recipientId }],
            requestGroupId
          }
        ],
        { session }
      );

      sessionDoc = newSession;
    } else {
      const alreadyParticipant = sessionDoc.participants.some(
        (p) => p.user.toString() === recipientId.toString()
      );

      if (!alreadyParticipant) {
        sessionDoc.participants.push({ user: recipientId });
        await sessionDoc.save({ session });
      }
    }

    const sessionId = sessionDoc._id;

    affectedSenderField.addToSet({ session: sessionId });
    affectedRecipientField.addToSet({ session: sessionId });

    await affectedSenderDoc.save({ session });
    await affectedRecipientDoc.save({ session });

    return sessionDoc.toObject();
  }
});

export const leaveSession = async (req, res, next) => {};
