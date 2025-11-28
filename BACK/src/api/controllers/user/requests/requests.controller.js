import requestsService from '../../../../services/internal/requests.service.js';
import { emit } from '../../../../utils/controllerUtils.js';
import withTransaction from '../../../../utils/transactionWrapper.js';
import { getUserChild } from '../userChildren.controller.js';

//* GET
export const getRequests = getUserChild;

//? The following controller factories are used in controllers of models that use requests:
//? - Friends
//? - Sessions

//* PATCH

export const sendRequest =
  ({ type, resMessage, emitMessage }) =>
  async (req, res, next) => {
    const {
      params: { id: currentUserId },
      body: { otherUserId },
      status
    } = req;

    try {
      const { senderDoc: currentUserDoc } = await requestsService.sendRequest({
        senderId: currentUserId,
        recipientId: otherUserId,
        type
      });

      emit({ from: currentUserId, to: otherUserId }, emitMessage);

      return res.status(status).json({ message: resMessage, currentUserDoc });
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

    try {
      const result = await withTransaction(async (session) => {
        const {
          recipientDoc: currentUserDoc,
          affectedRecipientDoc: currentUserFriendsDoc
        } = await requestsService.acceptRequest(
          {
            senderId: otherUserId,
            recipientId: currentUserId,
            type,
            AffectedModel,
            affectedField
          },
          session
        );

        let sideEffectResult;
        if (sideEffect) sideEffectResult = await sideEffect(session);

        return {
          currentUserDoc,
          currentUserFriendsDoc,
          sideEffectResult
        };
      }, session);

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

    const isCancellation = option === 'cancel';
    const isRejection = option === 'reject';

    if (isCancellation) {
      senderId = currentUserId;
      recipientId = otherUserId;

      resultDoc = 'senderDoc';
    } else if (isRejection) {
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
