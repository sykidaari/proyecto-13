import ERR from '../../../constants/errorCodes.js';
import SE from '../../../constants/socketEvents.js';
import OK from '../../../constants/successCodes.js';
import { customError, emit } from '../../../utils/controllerUtils.js';
import withTransaction from '../../../utils/transactionWrapper.js';
import Session from '../../models/session/session.model.js';
import SessionsList from '../../models/user/sessionsList/sessionsList.model.js';
import {
  acceptRequest,
  removeRequest,
  sendRequest
} from '../user/requests/requests.controller.js';
import { markAllItemsAsSeen } from '../user/userChildren.controller.js';

//* GET

//? ADMIN ONLY
export const getAllSessions = async (req, res, next) => {
  try {
    const sessions = await Session.find().populate('participants.user').lean();

    return res.status(200).json(sessions.toObject());
  } catch (err) {
    next(err);
  }
};

//ID COMES FROM MIDDLEWARE
export const getSessionById = async (req, res, next) => {
  const { session } = req;

  try {
    await session.populate(['participants.user', 'matchedMedias']);

    return res.status(200).json(session.toObject());
  } catch (err) {
    next(err);
  }
};

//* PATCH

// WORKS BOTH FOR NEW (NOT CREATED) AND EXISTING SESSIONS (ALREADY CREATED), DEPENDS ON ROUTE + ITS MIDDLEWARE
export const sendSessionRequest = sendRequest({
  type: 'sessions',
  resMessage: OK.sessions.requests.sent,
  emitMessage: SE.sessions.requests.received,

  requireUniqueConnection: false,
  allowMultiple: true,
  multipleLimit: 5,
  useRequestGroupId: true,
  onlyFriends: true
});

// ACCEPTS REQUEST AND EITHER JOINS EXISTING SESSION OR CREATES NEW ONE AND JOINS
export const acceptSessionRequestAndJoinSession = acceptRequest({
  type: 'sessions',
  AffectedModel: SessionsList,
  affectedField: 'sessionsList',
  resMessage: OK.sessions.requests.accepted,
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
    if (!request) throw customError(404, ERR.session.notFound);

    const { sessionParameters, requestGroupId } = request;

    let sessionDoc = await Session.findOne({ requestGroupId }).session(session);

    let isNewSession = false;
    let isNewParticipant = false;

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
      isNewSession = true;
    } else {
      const alreadyParticipant = sessionDoc.participants.some(
        (p) => p.user.toString() === recipientId.toString()
      );

      if (!alreadyParticipant) {
        sessionDoc.participants.push({ user: recipientId });
        await sessionDoc.save({ session });
        isNewParticipant = true;
      }
    }

    const sessionId = sessionDoc._id;

    affectedSenderField.addToSet({ session: sessionId });
    affectedRecipientField.addToSet({ session: sessionId });

    await affectedSenderDoc.save({ session });
    await affectedRecipientDoc.save({ session });

    const participantIds = sessionDoc.participants.map((p) =>
      p.user.toString()
    );
    if (isNewSession) {
      for (const id of participantIds) {
        emit({ from: recipientId, to: id }, SE.sessions.created);
      }
    } else if (isNewParticipant) {
      for (const id of participantIds) {
        if (id === recipientId.toString()) continue;

        emit(
          {
            from: recipientId,
            to: id
          },
          SE.sessions.participantsChanges.participantJoined
        );
      }
    }

    return sessionDoc.toObject();
  }
});

export const markAllReceivedSessionsRequestsAsSeen =
  markAllItemsAsSeen('sessions.received');

export const cancelSessionRequest = removeRequest({
  type: 'sessions',
  option: 'reject',
  resMessage: OK.sessions.requests.cancelled,
  emitMessage: SE.sessions.requests.cancelled,
  allowMultiple: false
});

export const rejectSessionRequest = removeRequest({
  type: 'sessions',
  option: 'reject',
  resMessage: OK.sessions.requests.rejected,
  emitMessage: SE.sessions.requests.rejected
});

export const leaveSession = async (req, res, next) => {
  const {
    params: { userId: currentUserId },
    session
  } = req;

  try {
    const { sessionsListDoc, remainingParticipantIds, wasLastUser } =
      await withTransaction(async (ses) => {
        session.participants.pull({ user: currentUserId });

        const sessionsListDoc = await SessionsList.findOne({
          user: currentUserId
        });

        if (sessionsListDoc) {
          // Does not give error if sessionsListDoc isn't found, because the doc should exist, if doesn't exist, it's a bug, and user should be able to leave the current session anyways.
          sessionsListDoc.sessionsList.pull({ session: session._id });
          await sessionsListDoc.save({ session: ses });
        }

        let remainingParticipantIds = [];

        const wasLastUser = session.participants.length === 0;
        if (wasLastUser) await session.deleteOne({ session: ses });
        else {
          await session.save({ session: ses });

          remainingParticipantIds = session.participants.map((participant) =>
            participant.user.toString()
          );
        }
        return { sessionsListDoc, remainingParticipantIds, wasLastUser };
      });

    for (const participantId of remainingParticipantIds) {
      emit(
        { from: currentUserId, to: participantId },
        SE.sessions.participantsChanges.participantLeft
      );
    }

    return res.status(200).json({
      message: wasLastUser
        ? OK.sessions.general.deleted
        : OK.sessions.general.left,
      sessionsListDoc
    });
  } catch (err) {
    next(err);
  }
};

// edit session missing baby
