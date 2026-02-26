import mongoose from 'mongoose';
import requestsService from '../../../../services/internal/requests.service.js';
import { customError, emit } from '../../../../utils/controllerUtils.js';
import withTransaction from '../../../../utils/transactionWrapper.js';
import User from '../../../models/user/user.model.js';
import { getUserChild } from '../userChildren.controller.js';
import Friends from '../../../models/user/friends/friends.model.js';
import ERR from '../../../../constants/domain/errorCodes.js';

//* GET
export const getRequests = getUserChild({
  populateFields: ['friends.received.user', 'sessions.received.user']
});

//? The following controller factories are used in controllers of models that use requests:
//? - Friends
//? - Sessions

//* PATCH

// CAN SEND SINGLE OR MULTIPLE REQS AT ONCE, IN "" OR []
export const sendRequest =
  ({
    type,
    resMessage,
    emitMessage,

    requireUniqueConnection = true,

    allowMultiple = false,

    multipleLimit,
    useRequestGroupId = false,

    onlyFriends = false
  }) =>
  async (req, res, next) => {
    const {
      params: { userId: currentUserId },
      body: { otherUserId, additionalPayload },
      status
    } = req;

    const recipients = Array.isArray(otherUserId) ? otherUserId : [otherUserId];

    if (allowMultiple && recipients.length > multipleLimit)
      throw customError(400, ERR.request.invalid.tooManyRecipients, {
        limit: multipleLimit
      });
    if (!allowMultiple && recipients.length > 1)
      throw customError(400, ERR.request.invalid.multiNotAllowed);

    let friendIdsSet;
    if (onlyFriends) {
      const senderFriends = await Friends.findOne({
        user: currentUserId
      }).lean();

      friendIdsSet = new Set(
        senderFriends?.friendsList?.map((f) => f.user.toString()) ?? []
      );
    }

    for (const recipientId of recipients) {
      if (onlyFriends && !friendIdsSet.has(recipientId)) {
        throw customError(403, ERR.request.invalid.notFriend);
      }
    }

    const results = [];
    let finalSenderDoc;

    const requestGroupId = useRequestGroupId
      ? req.body.requestGroupId || new mongoose.Types.ObjectId()
      : undefined;

    try {
      for (const recipientId of recipients) {
        try {
          const { senderDoc } = await requestsService.sendRequest({
            senderId: currentUserId,
            recipientId,
            type,
            requireUniqueConnection,
            requestGroupId,
            additionalPayload
          });

          finalSenderDoc = senderDoc;

          emit({ from: currentUserId, to: recipientId }, emitMessage);

          results.push({
            recipientId,
            success: true
          });
        } catch (err) {
          const failedUser = await User.findById(recipientId)
            .select('userName')
            .lean();

          results.push({
            recipientId,
            userName: failedUser?.userName,
            success: false,
            error: err.message
          });
        }
      }

      return res.status(status).json({
        message: resMessage,
        results,
        currentUserDoc: finalSenderDoc
      });
    } catch (err) {
      next(err);
    }
  };

export const acceptRequest =
  ({
    type,
    AffectedModel,
    affectedField,
    resMessage,
    emitMessage,

    sideEffect
  }) =>
  async (req, res, next) => {
    const {
      params: { userId: currentUserId },
      body: { otherUserId },
      status
    } = req;

    const senderId = otherUserId;
    const recipientId = currentUserId;

    const isComplexOperation = sideEffect ? true : false;

    try {
      const result = await withTransaction(async (session) => {
        const {
          recipientDoc,
          affectedRecipientDoc,
          affectedRecipientField,
          affectedSenderField,
          senderDoc
        } = await requestsService.acceptRequest(
          {
            senderId,
            recipientId,
            type,
            isComplexOperation,
            AffectedModel,
            affectedField
          },
          session
        );

        let sideEffectResult;
        if (sideEffect)
          sideEffectResult = await sideEffect(
            {
              senderDoc,
              senderId,
              recipientId,
              affectedRecipientField,
              affectedSenderField
            },
            session
          );

        return {
          currentUserDoc: recipientDoc,
          affectedCurrentUserDoc: affectedRecipientDoc,
          sideEffectResult
        };
      });

      emit({ from: currentUserId, to: otherUserId }, emitMessage);

      return res.status(status).json({
        message: resMessage,
        ...result
      });
    } catch (err) {
      next(err);
    }
  };

// used for reject and cancel

// OPTION CAN ONLY BE "reject" OR "cancel"
export const removeRequest =
  ({ type, option, resMessage, emitMessage, allowMultiple = false }) =>
  async (req, res, next) => {
    const {
      params: { userId: currentUserId },
      body: { otherUserId },
      status
    } = req;

    const recipients = Array.isArray(otherUserId) ? otherUserId : [otherUserId];

    if (!allowMultiple && recipients.length > 1)
      throw customError(400, ERR.request.invalid.multiNotAllowed);

    const results = [];
    let finalDoc;

    try {
      for (const targetId of recipients) {
        let senderId;
        let recipientId;
        let resultDoc;

        if (option === 'cancel') {
          senderId = currentUserId;
          recipientId = targetId;
          resultDoc = 'senderDoc';
        } else if (option === 'reject') {
          senderId = targetId;
          recipientId = currentUserId;
          resultDoc = 'recipientDoc';
        }

        try {
          const docs = await requestsService.removeRequest({
            senderId,
            recipientId,
            type
          });

          finalDoc = docs[resultDoc];

          emit({ from: currentUserId, to: targetId }, emitMessage);

          results.push({
            recipientId: targetId,
            success: true
          });
        } catch (err) {
          results.push({
            recipientId: targetId,
            success: false,
            error: err.message
          });
        }
      }

      return res.status(status).json({
        message: resMessage,
        results,
        currentUserDoc: finalDoc
      });
    } catch (err) {
      next(err);
    }
  };
