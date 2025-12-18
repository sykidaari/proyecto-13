import Requests from '../../api/models/user/requests/requests.model.js';
import ERR from '../../constants/domain/errorCodes.js';
import { customError } from '../../utils/controllerUtils.js';
import withTransaction from '../../utils/transactionWrapper.js';

//? EXPLANATION:
// sender (senderId, senderDoc, etc.) is always the user who has originally made the request
// recipient (recipientId, recipientDoc, etc.) is always the user who has received the request
//
// in controllers, when calling the service functions, it is important to keep this in mind.

// EXAMPLE:
// We have user A and user B:

// user A sends request:
// await requestsService.sendRequest({
//   senderId: //* user A's id, --> this is the current user
//   recipientId: //! user B's id,
//   ...
// });

// user A accepts request:
// await requestsService.acceptRequest({
//   senderId: //! user B's id,
//   recipientId: //* user A's id,  --> this is the current user
//   ...
// });

// As we can see, where we place the current user (sender or recipient) changes depending on their role in the action, still //? current user is always the one who starts the action through a REST operation

//* --- HELPERS EXCLUSIVE TO THIS SERVICE ------------------------------------

const listContainsUser = (list, userId) =>
  list.some((item) => item.user?.toString() === userId.toString());

const findRequestsDocsAndFields = async (
  senderId,
  recipientId,
  type,
  session
) => {
  const senderDoc = await Requests.findOne({ user: senderId })
    .select(`${type}.sent`)
    .session(session);

  if (!senderDoc) throw customError(404, ERR.request.notFound.senderDoc);

  const recipientDoc = await Requests.findOne({ user: recipientId })
    .select(`${type}.received`)
    .session(session);

  if (!recipientDoc) throw customError(404, ERR.request.notFound.recipientDoc);

  return {
    senderDoc,
    senderSentField: senderDoc[type].sent,
    recipientDoc,
    recipientReceivedField: recipientDoc[type].received
  };
};

const findAffectedDocsAndFields = async (
  senderId,
  recipientId,
  AffectedModel,
  affectedField,
  session
) => {
  const affectedSenderDoc = await AffectedModel.findOne({ user: senderId })
    .select(affectedField)
    .session(session);

  if (!affectedSenderDoc)
    throw customError(404, ERR.request.notFound.affectedSenderDoc, {
      model: AffectedModel.modelName
    });

  const affectedRecipientDoc = await AffectedModel.findOne({
    user: recipientId
  })
    .select(affectedField)
    .session(session);

  if (!affectedRecipientDoc)
    throw customError(404, ERR.request.notFound.affectedRecipientDoc, {
      model: AffectedModel.modelName
    });

  return {
    affectedSenderDoc,
    affectedSenderField: affectedSenderDoc[affectedField],
    affectedRecipientDoc,
    affectedRecipientField: affectedRecipientDoc[affectedField]
  };
};
//* ---------------------------------------

//* ---  SERVICE FUNCTIONS ------------------------------------

const sendRequest = async (
  {
    senderId,
    recipientId,
    type,
    requireUniqueConnection = true,
    requestGroupId,
    additionalPayload
  },
  session
) =>
  withTransaction(async (session) => {
    const { senderDoc, senderSentField, recipientDoc, recipientReceivedField } =
      await findRequestsDocsAndFields(senderId, recipientId, type, session);

    if (requestGroupId) {
      const recipientAlreadyInvited = recipientReceivedField.some(
        (item) => item.requestGroupId?.toString() === requestGroupId.toString()
      );

      // user can only be invited once, if is invited already front is informed with error
      if (recipientAlreadyInvited)
        throw customError(409, ERR.request.conflict.recipientAlreadyInvited);
    }

    // If for whatever reason request only exists on one user, it's treated as nonexisting so it can be made again to correct it
    const alreadyExists =
      listContainsUser(senderSentField, recipientId) &&
      listContainsUser(recipientReceivedField, senderId);

    if (requireUniqueConnection && alreadyExists)
      throw customError(409, ERR.request.conflict.alreadyExists);

    const senderFieldPayload = { user: recipientId };
    const recipientFieldPayload = { user: senderId };

    if (requestGroupId) {
      senderFieldPayload.requestGroupId = requestGroupId;
      recipientFieldPayload.requestGroupId = requestGroupId;
    }

    if (additionalPayload) {
      senderFieldPayload.additionalPayload = additionalPayload;
      recipientFieldPayload.additionalPayload = additionalPayload;
    }

    requireUniqueConnection
      ? senderSentField.addToSet(senderFieldPayload)
      : senderSentField.push(senderFieldPayload);

    requireUniqueConnection
      ? recipientReceivedField.addToSet(recipientFieldPayload)
      : recipientReceivedField.push(recipientFieldPayload);

    await senderDoc.save({ session });
    await recipientDoc.save({ session });

    return {
      senderDoc: senderDoc.toObject(),
      recipientDoc: recipientDoc.toObject()
    };
  }, session);

const acceptRequest = async (
  {
    senderId,
    recipientId,
    type,
    isComplexOperation = false,
    AffectedModel,
    affectedField
  },
  session
) =>
  withTransaction(async (session) => {
    const { senderDoc, senderSentField, recipientDoc, recipientReceivedField } =
      await findRequestsDocsAndFields(senderId, recipientId, type, session);

    const existsOnBoth =
      listContainsUser(senderSentField, recipientId) &&
      listContainsUser(recipientReceivedField, senderId);

    if (!existsOnBoth) throw customError(404, ERR.request.notFound.request);

    let requestId;
    if (isComplexOperation) {
      const requestEntry = senderSentField.find(
        (item) => item.user.toString() === recipientId.toString()
      );

      requestId = requestEntry?._id;
    }

    senderSentField.pull({ user: recipientId });
    recipientReceivedField.pull({ user: senderId });

    await senderDoc.save({ session });
    await recipientDoc.save({ session });

    const {
      affectedSenderDoc,
      affectedSenderField,
      affectedRecipientDoc,
      affectedRecipientField
    } = await findAffectedDocsAndFields(
      senderId,
      recipientId,
      AffectedModel,
      affectedField,
      session
    );

    if (!isComplexOperation) {
      affectedSenderField.addToSet({ user: recipientId });
      affectedRecipientField.addToSet({ user: senderId });

      await affectedSenderDoc.save({ session });
      await affectedRecipientDoc.save({ session });
    }

    return {
      senderDoc: senderDoc.toObject(),
      recipientDoc: recipientDoc.toObject(),

      affectedSenderDoc: isComplexOperation
        ? affectedSenderDoc
        : affectedSenderDoc.toObject(),
      affectedRecipientDoc: isComplexOperation
        ? affectedRecipientDoc
        : affectedRecipientDoc.toObject(),

      affectedSenderField,
      affectedRecipientField,

      ...(isComplexOperation && { requestId })
    };
  }, session);

const removeRequest = async ({ senderId, recipientId, type }, session) =>
  withTransaction(async (session) => {
    const { senderDoc, senderSentField, recipientDoc, recipientReceivedField } =
      await findRequestsDocsAndFields(senderId, recipientId, type, session);

    const existsOnEither =
      listContainsUser(senderSentField, recipientId) ||
      listContainsUser(recipientReceivedField, senderId);

    if (!existsOnEither) throw customError(404, ERR.request.notFound.request);

    senderSentField.pull({ user: recipientId });
    recipientReceivedField.pull({ user: senderId });

    await senderDoc.save({ session });
    await recipientDoc.save({ session });

    return {
      senderDoc: senderDoc.toObject(),
      recipientDoc: recipientDoc.toObject()
    };
  }, session);

//* ---------------------------------------

const requestsService = { sendRequest, acceptRequest, removeRequest };
export default requestsService;
