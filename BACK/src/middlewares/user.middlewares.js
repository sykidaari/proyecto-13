import User from '../api/models/user/user.model';
import { verifyToken } from '../config/jwt';
import { customError } from '../utils/controllerUtils';

export const setAccessFlags = async (req, res, next) => {
  req.user = null;
  req.isAdmin = false;
  req.isCurrentUser = false;

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return next();

    const { id } = verifyToken(token);
    const user = await User.findById(id).select('+role').lean();
    if (!user) return next();

    req.user = user;
    req.isAdmin = user.role === 'admin';
    req.isCurrentUser = req.params?.id === user._id.toString();
  } catch (err) {
    // ignores errors, continues, just keeps initial values
  }

  next();
};

export const isGuest = (req, res, next) => {
  if (req.user) return next(customError(403, 'already logged in'));
  next();
};

export const isUser = () => {
  if (!req.user) return next(customError(401, "you're unauthorized"));
  next();
};

export const canEdit = (req, res, next) => {
  if (!req.isCurrentUser && !req.isAdmin)
    return next(customError(403, "you're unauthorized"));
  next();
};

export const requireAdmin = (req, res, next) => {
  if (!req.isAdmin) return next(customError(403, 'admin access required'));
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
