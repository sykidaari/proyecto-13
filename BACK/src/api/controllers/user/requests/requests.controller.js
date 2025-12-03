import requestsService from '../../../../services/internal/requests.service.js';
import { customError, emit } from '../../../../utils/controllerUtils.js';
import withTransaction from '../../../../utils/transactionWrapper.js';
import User from '../../../models/user/user.model.js';
import { getUserChild } from '../userChildren.controller.js';

//* GET
export const getRequests = getUserChild;

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
    isUnique = true,
    allowMultiple = false,
    multipleLimit,
    beforeSend
  }) =>
  async (req, res, next) => {
    const {
      params: { id: currentUserId },
      body: { otherUserId },
      status
    } = req;

    const recipients = Array.isArray(otherUserId) ? otherUserId : [otherUserId];

    if (allowMultiple && recipients.length > multipleLimit)
      throw customError(400, `can only send ${multipleLimit} requests at once`);
    if (!allowMultiple && recipients.length > 1)
      throw customError(400, 'can only send one request at a time');

    const results = [];
    let finalSenderDoc;

    let requestGroupId;
    if (beforeSend) requestGroupId = beforeSend();

    try {
      for (const recipientId of recipients) {
        try {
          const { senderDoc } = await requestsService.sendRequest({
            senderId: currentUserId,
            recipientId,
            type,
            isUnique,
            requestGroupId
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
      params: { id: currentUserId },
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
  ({ type, option, resMessage, emitMessage }) =>
  async (req, res, next) => {
    const {
      params: { id: currentUserId },
      body: { otherUserId },
      status
    } = req;

    let senderId;
    let recipientId;
    let resultDoc;

    if (option === 'cancel') {
      senderId = currentUserId;
      recipientId = otherUserId;
      resultDoc = 'senderDoc';
    } else if (option === 'reject') {
      senderId = otherUserId;
      recipientId = currentUserId;
      resultDoc = 'recipientDoc';
    }

    try {
      const { [resultDoc]: currentUserDoc } =
        await requestsService.removeRequest({
          senderId,
          recipientId,
          type
        });

      emit({ from: currentUserId, to: otherUserId }, emitMessage);

      return res.status(status).json({ message: resMessage, currentUserDoc });
    } catch (err) {
      next(err);
    }
  };
