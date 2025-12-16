import User from '../api/models/user/user.model.js';
import { verifyToken } from '../config/jwt.js';
import ERR from '../constants/errorCodes.js';
import { customError } from '../utils/controllerUtils.js';

//! IMPORTANT NOTE ABOUT MIDDLEWARES
//* setAccessFlags used to set req.isSelf, but that caused issues. When setAccessFlags runs in userRouter (src/routes/user/user.router.js), Express hasn’t reached the /:userId route yet, so req.params.id does not exist. Since req.isSelf depends on req.params.id, the check was moved to a separate middleware (setIsSelf) that runs after the params are available. This ensures req.isSelf is set correctly.

//! So be careful with these middlewares!!! Easy to accidentally break system

export const setBasicAccessFlags = async (req, res, next) => {
  req.user = null;
  req.isAdmin = false;

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return next();

    const { userId } = verifyToken(token);
    const user = await User.findById(userId).select('+role').lean();
    if (!user) return next();

    req.user = user;
    req.isAdmin = user.role === 'admin';
  } catch (err) {
    // ignores errors, continues, just keeps initial values
  }
  next();
};

export const setIsSelf = (req, res, next) => {
  const { user, params } = req;

  req.isSelf = user?._id?.toString() === params.userId;
  next();
};

export const requireGuest = (req, res, next) => {
  const { user } = req;

  if (user) throw customError(403, ERR.access.alreadyLoggedIn);
  next();
};

export const requireUser = (req, res, next) => {
  const { user } = req;

  if (!user) throw customError(401, ERR.access.unauthorized);
  next();
};

export const requireSelf = (req, res, next) => {
  const { isSelf } = req;

  if (!isSelf) throw customError(403, ERR.access.notSelf);
  next();
};

export const requireAdmin = (req, res, next) => {
  const { isAdmin } = req;

  if (!isAdmin) throw customError(403, ERR.access.adminRequired);
  next();
};

export const requireSelfOrAdmin = (req, res, next) => {
  const { isSelf, isAdmin } = req;

  if (!isSelf && !isAdmin) throw customError(403, ERR.access.notSelfOrAdmin);
  next();
};

export const requireSelfOrAdminOrFriendWithPrivacy =
  (field) => async (req, res, next) => {
    const {
      user: { _id: currentUserId },
      params: { userId: targetUserId },
      isSelf,
      isAdmin
    } = req;

    if (isSelf || isAdmin) return next();

    const targetUser = await User.findById(targetUserId).select(
      `accountSettings.isSharedInfo.${field}`
    );

    const isShared = targetUser?.accountSettings?.isSharedInfo?.[field];

    if (!isShared) throw customError(403, ERR.access.privacyDisabled);

    const isFriend = await Friends.findOne({
      user: targetUserId,
      'friendsList.user': currentUserId
    });

    if (!isFriend) throw customError(403, ERR.access.notFriend);

    next();
  };

export const requireSelfOrAdminOrFriendOrSessionParticipant = async (
  req,
  res,
  next
) => {
  const {
    user: { _id: currentUserId },
    params: { userId: targetUserId },
    isSelf,
    isAdmin
  } = req;

  if (isSelf || isAdmin) return next();

  const isFriend = await Friends.findOne({
    user: targetUserId,
    'friendsList.user': currentUserId
  });
  if (isFriend) return next();

  const sharedSession = await Session.findOne({
    'participants.user': { $all: [currentUserId, targetUserId] }
  });
  if (sharedSession) return next();

  throw customError(403, ERR.access.notFriendOrParticipant);
};

export const setIsSessionParticipant = async (req, res, next) => {
  const { user, session } = req;

  req.isSessionParticipant = false;

  const isParticipant = session.participants.some(
    (participant) => participant.user.toString() === user.toString()
  );

  if (isParticipant) req.isSessionParticipant = true;

  next();
};

export const requireSessionParticipantOrAdmin = (req, res, next) => {
  const { isSessionParticipant, isAdmin } = req;

  if (!isSessionParticipant && !isAdmin)
    throw customError(403, ERR.access.notParticipantOrAdmin);
};
