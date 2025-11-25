import Requests from '../../api/models/user/requests/requests.model';
import { customError, listContainsValue } from '../../utils/controllerUtils';
import withTransaction from '../../utils/transactionWrapper';

//* HELPERS EXCLUSIVE TO THIS SERVICE
const findRequestsDocsAndFields = async (
  senderId,
  recipientId,
  type,
  session
) => {
  const senderDoc = await Requests.findOne({ user: senderId })
    .select(`${type}.sent`)
    .session(session);

  if (!senderDoc) throw customError(404, 'sender requests-document not found');

  const recipientDoc = await Requests.findOne({ user: recipientId })
    .select(`${type}.received`)
    .session(session);

  if (!recipientDoc)
    throw customError(404, 'recipient requests-document not found');

  const senderSentField = senderDoc[type].sent;
  const recipientReceivedField = recipientDoc[type].received;

  return { senderDoc, senderSentField, recipientDoc, recipientReceivedField };
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
    throw customError(404, 'affected sender document not found');

  const affectedRecipientDoc = await AffectedModel.findOne({
    user: recipientId
  })
    .select(affectedField)
    .session(session);

  if (!affectedRecipientDoc)
    throw customError(404, 'affected recipient document not found');

  const affectedSenderField = affectedSenderDoc[affectedField];
  const affectedRecipientField = affectedRecipientDoc[affectedField];

  return {
    affectedSenderDoc,
    affectedSenderField,
    affectedRecipientDoc,
    affectedRecipientField
  };
};

//* SERVICE FUNCTIONS
const sendRequest = async ({ senderId, recipientId, type }, session) =>
  withTransaction(async (session) => {
    const { senderDoc, senderSentField, recipientDoc, recipientReceivedField } =
      await findRequestsDocsAndFields(senderId, recipientId, type, session);

    //* If for whatever reason request only exists on one user, it's treated as nonexisting so it can be made again to correct it
    if (
      listContainsValue(senderSentField, recipientId) &&
      listContainsValue(recipientReceivedField, senderId)
    )
      throw customError(409, "request already exists, can't send");

    senderSentField.addToSet(recipientId);
    recipientReceivedField.addToSet(senderId);

    await senderDoc.save({ session });
    await recipientDoc.save({ session });

    return { senderDoc, recipientDoc };
  }, session);

const acceptRequest = async (
  { senderId, recipientId, type, AffectedModel, affectedField },
  session
) =>
  withTransaction(async (session) => {
    const { senderDoc, senderSentField, recipientDoc, recipientReceivedField } =
      await findRequestsDocsAndFields(senderId, recipientId, type, session);

    if (
      !listContainsValue(senderSentField, recipientId) ||
      !listContainsValue(recipientReceivedField, senderId)
    )
      throw customError(404, "request doesn't exist, can't accept");

    senderSentField.pull(recipientId);
    recipientReceivedField.pull(senderId);

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

    affectedSenderField.addToSet(recipientId);
    affectedRecipientField.addToSet(senderId);

    await affectedSenderDoc.save({ session });
    await affectedRecipientDoc.save({ session });

    return { senderDoc, affectedSenderDoc, recipientDoc, affectedRecipientDoc };
  }, session);

const removeRequest = async ({ senderId, recipientId, type }, session) =>
  withTransaction(async (session) => {
    const { senderDoc, senderSentField, recipientDoc, recipientReceivedField } =
      await findRequestsDocsAndFields(senderId, recipientId, type, session);

    if (
      !listContainsValue(senderSentField, recipientId) &&
      !listContainsValue(recipientReceivedField, senderId)
    )
      throw customError(404, "request doesn't exist, can't reject");

    senderSentField.pull(recipientId);
    recipientReceivedField.pull(senderId);

    await senderDoc.save({ session });
    await recipientDoc.save({ session });

    return { senderDoc, recipientDoc };
  }, session);

const requestsService = { sendRequest, acceptRequest, removeRequest };
export default requestsService;
