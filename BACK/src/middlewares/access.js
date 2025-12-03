import Session from '../api/models/session/session.model.js';
import User from '../api/models/user/user.model.js';
import { verifyToken } from '../config/jwt.js';
import { customError } from '../utils/controllerUtils.js';

//! IMPORTANT NOTE ABOUT MIDDLEWARES
//* setAccessFlags used to set req.isOwner, but that caused issues. When setAccessFlags runs in userRouter (src/routes/user/user.router.js), Express hasn’t reached the /:id route yet, so req.params.id does not exist. Since req.isOwner depends on req.params.id, the check was moved to a separate middleware (setIsOwner) that runs after the params are available. This ensures req.isOwner is set correctly.

//! So be careful with these middlewares!!! Easy to accidentally break system

//* GENERAL, FULL APP:

export const setAccessFlags = async (req, res, next) => {
  req.user = null;
  req.isAdmin = false;

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return next();

    const { id } = verifyToken(token);
    const user = await User.findById(id).select('+role').lean();
    if (!user) return next();

    req.user = user;
    req.isAdmin = user.role === 'admin';
  } catch (err) {
    // ignores errors, continues, just keeps initial values
  }
  next();
};

export const setIsOwner = (req, res, next) => {
  const { user, params } = req;

  req.isOwner = user?._id?.toString() === params.id;
  next();
};

export const requireGuest = (req, res, next) => {
  const { user } = req;

  if (user) throw customError(403, 'already logged in');
  next();
};

export const requireUser = (req, res, next) => {
  const { user } = req;

  if (!user) throw customError(401, "you're unauthorized");
  next();
};

export const requireOwner = (req, res, next) => {
  const { isOwner } = req;

  if (!isOwner) throw customError(403, "you're unauthorized");
  next();
};

export const requireAdmin = (req, res, next) => {
  const { isAdmin } = req;

  if (!isAdmin) throw customError(403, 'admin access required');
  next();
};

export const requireOwnerOrAdmin = (req, res, next) => {
  const { isOwner, isAdmin } = req;

  if (!isOwner && !isAdmin) throw customError(403, "you're unauthorized");
  next();
};

//* FOR SESSIONS
export const setIsSessionParticipant = async (req, res, next) => {
  const {
    params: { id: sessionId },
    user
  } = req;

  req.isSessionParticipant = null;

  try {
    const session = await Session.findById(sessionId);

    if (!session) throw customError(404, 'session not found');

    req.session = session;

    const isParticipant = session.participants.some(
      (participant) => participant.user.toString() === user.toString()
    );

    if (isParticipant) req.isSessionParticipant = true;

    next();
  } catch (error) {
    next(err);
  }
};

export const requireSessionParticipantOrAdmin = () => {
  const { isSessionParticipant, isAdmin } = req;

  if (!isSessionParticipant && !isAdmin)
    throw customError(403, "you're unauthorized");
};
