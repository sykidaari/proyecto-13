import User from '../api/models/user/user.model';
import { verifyToken } from '../config/jwt';
import { customError } from '../utils/controllerUtils';

//* UTILS
const verifiedUser = async (req, projection) => {
  const token = req.headers.authorization;

  if (!token) throw unauthorizedError;

  const parsedToken = token.replace('Bearer ', '');

  const { id } = verifyToken(parsedToken);

  const user = await User.findById(id).select(projection).lean();

  return user;
};

const unauthorizedError = customError(401, 'you are unauthorized');
//*
//*
//*

// ? AUTH
export const isUser = async (req, res, next) => {
  try {
    const user = await verifiedUser(req);
    if (!user) return next(unauthorizedError);

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export const isCurrentUser = async (req, res, next) => {
  try {
    const user = await verifiedUser(req);
    if (!user || req.user._id.toString() !== user._id.toString())
      return next(unauthorizedError);

    next();
  } catch (err) {
    next(err);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await verifiedUser(req, '+role');
    if (!user) return next(unauthorizedError);

    user.role === 'admin'
      ? ((req.user = user), next())
      : next(unauthorizedError);
  } catch (err) {
    next(err);
  }
};
//?
//?
//?

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
