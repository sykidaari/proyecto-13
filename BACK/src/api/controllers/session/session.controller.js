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

//* HELPERS EXCLUSIVE TO SESSIONS
const addMediaToField = (mediaId, field) => {
  const exists = field.some((entry) => entry.toString() === mediaId.toString());

  if (exists) throw customError(404, ERR.session.conflict.mediaAlreadyExists);

  field.addToSet(mediaId);
};

const splitParticipants = (session, currentUserId) => {
  const currentParticipant = session.participants.find(
    (participant) => participant.user.toString() === currentUserId
  );

  const otherParticipants = session.participants.filter(
    (participant) => participant.user.toString() !== currentUserId
  );

  return { currentParticipant, otherParticipants };
};
//*

//* GET

//? ADMIN ONLY
export const getAllSessions = async (req, res, next) => {
  try {
    const sessions = await Session.find()
      .populate([
        { path: 'participants.user', select: 'userName' },
        'discardedMedias',
        'matchedMedias'
      ])
      .lean();

    return res.status(200).json(sessions);
  } catch (err) {
    next(err);
  }
};

//ID COMES FROM MIDDLEWARE
export const getSessionById = async (req, res, next) => {
  const { session } = req;

  try {
    await session.populate([
      { path: 'participants.user', select: 'userName' },
      'matchedMedias'
    ]);

    return res.status(200).json(session.toObject());
  } catch (err) {
    next(err);
  }
};

// See sessions you share with another user. So if you go to the user's profile you can see which sessions you're both in, like shared chat's in whatsapp
export const getSharedSessions = async (req, res, next) => {
  const { userId: currentUserId, otherUserId } = req.params;

  try {
    const sharedSessions = await Session.find({
      'participants.user': { $all: [currentUserId, otherUserId] }
    })
      .populate({ path: 'participants.user', select: 'userName' })
      .lean();

    return res.status(200).json(sharedSessions);
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

// "swipe right"
export const proposeMatch = async (req, res, next) => {
  const {
    session,
    params: { userId: currentUserId },
    body: { mediaId }
  } = req;

  const isDiscarded = session.discardedMedias.some(
    (media) => media.toString() === mediaId.toString()
  );

  if (isDiscarded)
    throw customError(403, ERR.session.conflict.mediaIsDiscarded);

  const { currentParticipant, otherParticipants } = splitParticipants(
    session,
    currentUserId
  );

  addMediaToField(mediaId, currentParticipant.matchProposals);

  const isMatch = session.participants.every((participant) =>
    participant.matchProposals.includes(mediaId)
  );

  if (isMatch) addMediaToField(mediaId, session.matchedMedias);

  try {
    await session.save();

    for (const otherParticipant of otherParticipants) {
      emit(
        { from: currentUserId, to: otherParticipant.user.toString() },
        isMatch ? SE.sessions.newMatch : SE.sessions.newInteraction
      );
    }

    return res.status(200).json({ mediaId, isMatch });
  } catch (err) {
    next(err);
  }
};

// "swipe left"
export const discardMedia = async (req, res, next) => {
  const {
    session,
    params: { userId: currentUserId },
    body: { mediaId }
  } = req;

  const isMatched = session.matchedMedias.some(
    (media) => media.toString() === mediaId.toString()
  );

  if (isMatched) throw customError(403, ERR.session.conflict.mediaIsMatched);

  addMediaToField(mediaId, session.discardedMedias);

  try {
    await session.save();

    const { otherParticipants } = splitParticipants(session, currentUserId);

    for (const otherParticipant of otherParticipants) {
      emit(
        { from: currentUserId, to: otherParticipant.user.toString() },
        SE.sessions.newInteraction
      );
    }

    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
