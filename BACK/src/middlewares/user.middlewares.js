import User from '../api/models/user/user.model.js';
import { verifyToken } from '../config/jwt.js';
import { customError } from '../utils/controllerUtils.js';

//! IMPORTANT NOTE ABOUT MIDDLEWARES
//* setAccessFlags used to set req.isOwner, but that caused issues. When setAccessFlags runs in userRouter (src/routes/user/user.router.js), Express hasn’t reached the /:id route yet, so req.params.id does not exist. Since req.isOwner depends on req.params.id, the check was moved to a separate middleware (setIsOwner) that runs after the params are available. This ensures req.isOwner is set correctly.

//! So be careful with these middlewares!!! Easy to accidentally break system

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
  req.isOwner = req.user?._id?.toString() === req.params.id;
  next();
};

export const requireGuest = (req, res, next) => {
  if (req.user) return next(customError(403, 'already logged in'));
  next();
};

export const requireUser = (req, res, next) => {
  if (!req.user) return next(customError(401, "you're unauthorized"));
  next();
};

export const requireOwner = (req, res, next) => {
  if (!req.isOwner) return next(customError(401, "you're unauthorized"));
  next();
};

export const requireAdmin = (req, res, next) => {
  if (!req.isAdmin) return next(customError(403, 'admin access required'));
  next();
};

export const requireOwnerOrAdmin = (req, res, next) => {
  if (!req.isOwner && !req.isAdmin)
    return next(customError(403, "you're unauthorized"));
  next();
};

export const checkDuplicateUser = async (req, res, next) => {
  const { userName, emailAddress } = req.body;

  try {
    const duplicateUser = await User.findOne({
      $or: [{ userName }, { emailAddress }]
    }).lean();
    if (duplicateUser)
      return next(customError(409, 'username or email already exists'));

    next();
  } catch (err) {
    next(err);
  }
};

//? OLD MIDDLEWARES BELOW, REPLACED BY setAccessFlags and rest
// const verifiedUser = async (req, projection) => {
//   const token = req.headers.authorization;

//   if (!token) throw unauthorizedError;

//   const parsedToken = token.replace('Bearer ', '');

//   const { id } = verifyToken(parsedToken);

//   const user = await User.findById(id).select(projection).lean();

//   return user;
// };

// const unauthorizedError = customError(401, 'you are unauthorized');
// //*
// //*
// //*

// // ? AUTH
// export const isUser = async (req, res, next) => {
//   try {
//     const user = await verifiedUser(req);
//     if (!user) return next(unauthorizedError);

//     req.user = user;
//     next();
//   } catch (err) {
//     next(err);
//   }
// };

// export const isCurrentUser = async (req, res, next) => {
//   try {
//     const user = await verifiedUser(req);
//     if (!user || req.user._id.toString() !== user._id.toString())
//       return next(unauthorizedError);

//     next();
//   } catch (err) {
//     next(err);
//   }
// };

// export const isAdmin = async (req, res, next) => {
//   try {
//     const user = await verifiedUser(req, '+role');
//     if (!user) return next(unauthorizedError);

//     user.role === 'admin'
//       ? ((req.user = user), next())
//       : next(unauthorizedError);
//   } catch (err) {
//     next(err);
//   }
// };
// //?
// //?
// //?
