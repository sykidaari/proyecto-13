// new, needed in front, avoids work in front
export const getRelationshipToUser = (req, res, next) => {
  const {
    friendsDoc,
    requestsDoc,
    status,
    params: { otherUserId }
  } = req;

  const isFriend = friendsDoc.friendsList.some(
    (item) => item.user.toString() === otherUserId.toString()
  );

  const hasSentRequest = requestsDoc.friends.sent.some(
    (item) => item.user.toString() === otherId
  );

  const hasReceivedRequest = requestsDoc.friends.received.some(
    (item) => item.user.toString() === otherId
  );

  try {
    res.status(status).json({
      isFriend,
      hasSentRequest,
      hasReceivedRequest
    });
  } catch (err) {
    next(err);
  }
};
