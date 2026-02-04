import ERR from '../../../../constants/domain/errorCodes.js';
import { getUserChild, markItemAsSeen } from '../userChildren.controller.js';

//* GET

export const getSessionsList = getUserChild({ populateFields: 'sessionsList' });

export const markSessionInListAsSeen = markItemAsSeen(
  'sessionsList',
  'session'
);

export const setSessionLastSeenAt = async (req, res, next) => {
  const {
    doc,
    status,
    body: { session: sessionId }
  } = req;

  const { sessionsList } = doc;

  try {
    const item = sessionsList.find(
      (entry) => entry.session.toString() === sessionId.toString()
    );

    if (!item) throw customError(404, ERR.userChild.notFound.item);

    item.lastSeenAt = new Date();

    await doc.save();

    return res.status(status).json({
      session: item.session,
      lastSeenAt: item.lastSeenAt
    });
  } catch (err) {
    next(err);
  }
};
