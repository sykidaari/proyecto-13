import Session from '../api/models/session/session.model.js';
import AppSettings from '../api/models/user/appSettings/appsettings.model.js';
import Favorites from '../api/models/user/favorites/favorites.model.js';
import Friends from '../api/models/user/friends/friends.model.js';
import LikedMedias from '../api/models/user/likedMedias/likedMedias.model.js';
import Requests from '../api/models/user/requests/requests.model.js';
import SessionsList from '../api/models/user/sessionsList/sessionsList.model.js';
import UserAccessSession from '../api/models/userAccessSession/userAccessSession.model.js';
import WatchedMedias from '../api/models/user/watchedMedias/watchedMedias.model.js';
import WatchList from '../api/models/user/watchList/watchList.model.js';
import { generateRefreshToken, hashRefreshToken } from '../config/auth.js';
import { io } from '../config/socket.js';
import ERR from '../constants/domain/errorCodes.js';

//* --- GENERAL ------------------------------------

const setNestedValue = (obj, path, value) => {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
};

export const validateAndApplyUpdates = (doc, reqFields, allowed) => {
  for (const [key, value] of Object.entries(reqFields)) {
    if (allowed.includes(key)) {
      setNestedValue(doc, key, value);
      continue;
    }

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      for (const nestedKey of Object.keys(value)) {
        const path = `${key}.${nestedKey}`;

        if (!allowed.includes(path)) {
          return path;
        }

        setNestedValue(doc, path, value[nestedKey]);
      }
      continue;
    }

    return key;
  }
};

export const resolvePath = (object, path) => {
  const keys = path.split('.');
  let current = object;

  for (const key of keys) {
    if (current == null || typeof current !== 'object') {
      return undefined; // Path does not exist
    }
    current = current[key];
  }

  return current;
};

export const oneWeekAgo = () => new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

//* ---------------------------------------

//! --- ERRORS ------------------------------------

export const customError = (status, message, data = {}) => {
  const err = new Error(message);
  err.status = status;

  Object.assign(err, data);
  return err;
};

//! ---------------------------------------

//* --- USERS ------------------------------------

export const userNotFoundError = customError(404, ERR.user.notFound);

export const createAdditionalUserDocs = async (
  session,
  userId,
  modelsArray
) => {
  const docs = [];

  for (const Model of modelsArray) {
    const [created] = await Model.create([{ user: userId }], { session });

    const modelObject = created.toObject();
    modelObject.modelName = Model.modelName;
    docs.push(modelObject);
  }

  return docs;
};

//* --- USER ACCCESS SESSION ------------------------------------
export const day = 24 * 60 * 60 * 1000;
export const rememberTtl = 30 * day;
const sessionTtl = 7 * day;

export const refreshTokenCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'none',
  path: '/userAccessSession'
};

export const setRefreshCookie = (res, token, maxAge) =>
  res.cookie('refreshToken', token, {
    ...refreshTokenCookieOptions,
    ...(maxAge && { maxAge })
  });

export const clearRefreshCookie = (res) =>
  res.clearCookie('refreshToken', refreshTokenCookieOptions);

export const createSession = async (res, userId, { rememberMe }) => {
  const persistent = Boolean(rememberMe);
  const ttl = persistent ? rememberTtl : sessionTtl;

  const refreshToken = generateRefreshToken();
  const refreshTokenHash = hashRefreshToken(refreshToken);

  await UserAccessSession.create({
    user: userId,
    tokenHash: refreshTokenHash,
    expiresAt: new Date(Date.now() + ttl),
    persistent
  });

  setRefreshCookie(res, refreshToken, persistent ? ttl : undefined);
};

//* ---------------------------------------

//* ---  USER CHILDMODELS ------------------------------------

// ALL MODELS DEPENDENT ON USER
export const childModels = [
  AppSettings,
  Favorites,
  Friends,
  Requests,
  SessionsList,
  WatchList,
  LikedMedias,
  WatchedMedias
];

export const deleteAdditionalUserDocs = async (
  session,
  userId,
  modelsArray
) => {
  for (const Model of modelsArray) {
    await Model.deleteOne({ user: userId }).session(session);
  }
};

//* ---------------------------------------

//* --- SOCKET-UTILS ------------------------------------

export const emit = ({ from, to }, event) => io.to(to).emit(event, { from });

export const emitUserMediaUpdate = (event) => {
  return async (req) => {
    const { userId } = req.params;

    const sessions = await Session.find({
      'participants.user': userId
    }).select('participants.user');

    const recipients = new Set();

    for (const session of sessions) {
      for (const participant of session.participants) {
        const id = participant.user.toString();
        if (id !== userId) recipients.add(id);
      }
    }

    for (const targetId of recipients) {
      emit({ from: userId, to: targetId }, event);
    }
  };
};

//* ---------------------------------------
