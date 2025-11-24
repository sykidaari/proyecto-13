import Requests from '../../models/user/requests/requests.model.js';
import { getUserChild } from '../userChildren.controller.js';

//* GET
export const getRequests = getUserChild;

//* Requests are used together with following models (and their routers and controllers):
//* Friend
//* SessionsList
//* Session

//* Following controllers are used with each models router and controller, not with requests router
//* requests router only has GET

// export const removeRequestFrom = (type) => async (req, res, next) => {
//   const {
//     body: { senderId },
//     params: { id: recipientId },
//     status
//   } = req;

//   try {
//     const sender = await Requests.findById(senderId).select(`${type}.sent`);
//     const recipient = await Requests.findById(recipientId).select(
//       `${type}.received`
//     );

//     if (
//       !sender[type].sent.includes(recipientId) &&
//       !recipient[type].received.includes(senderId)
//     )
//       return next(customError(400, `${type}-request not found, can't remove`));

//     const updatedSenderField = sender[type].sent.filter(
//       (itemId) => itemId.toString() !== recipientId
//     );
//     const updatedRecipientField = recipient[type].received.filter(
//       (itemId) => itemId.toString() !== senderId
//     );

//     sender[type].sent = updatedSenderField;
//     recipient[type].received = updatedRecipientField;

//     await sender.save();
//     await recipient.save();

//     return res
//       .status(status)
//       .json(`removed request from ${senderId} to ${recipientId}`);
//   } catch (err) {
//     next(err);
//   }
// };
