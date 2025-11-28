import AppSettings from '../api/models/user/appSettings/appsettings.model.js';
import Favorites from '../api/models/user/favorites/favorites.model.js';
import Friends from '../api/models/user/friends/friends.model.js';
import Requests from '../api/models/user/requests/requests.model.js';
import SessionsList from '../api/models/user/sessionsList/sessionsList.model.js';
import WatchLists from '../api/models/user/watchList/watchList.model.js';
import { io } from '../config/socket/socket.js';

//* GENERAL
export const validateAndApplyUpdates = (doc, reqFields, allowed) => {
  for (const [key, value] of Object.entries(reqFields)) {
    if (allowed.includes(key)) {
      doc[key] = value;
      continue;
    }

    if (value && typeof value === 'object') {
      for (const nestedKey of Object.keys(value)) {
        const path = `${key}.${nestedKey}`;
        if (!allowed.includes(path)) return path;

        doc[key] ||= {};
        doc[key][nestedKey] = value[nestedKey];
      }
      continue;
    }

    return key;
  }
};

export const listContainsValue = (list, value) => {
  list.some((listItem) => listItem.toString() === value.toString());
};

//!   ERRORS
export const customError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

export const missingFields = (requiredKeys) => {
  for (const [i, [key, value]] of Object.entries(requiredKeys).entries()) {
    if (!value) {
      return customError(400, `${key} missing at index ${i}`);
    }
  }
};

//* USERS
export const userNotFoundError = customError(404, 'user not found');

export const createAdditionalUserDocs = async (session, id, modelsArray) => {
  const docs = [];

  for (const Model of modelsArray) {
    const [created] = await Model.create([{ user: id }], { session });

    const modelObject = created.toObject();
    modelObject.modelName = Model.modelName;
    docs.push(modelObject);
  }

  return docs;
};

//* USER CHILDMODELS

// ALL MODELS DEPENDENT ON USER
export const childModels = [
  AppSettings,
  Favorites,
  Friends,
  Requests,
  SessionsList,
  WatchLists
];

export const deleteAdditionalUserDocs = async (session, id, modelsArray) => {
  for (const Model of modelsArray) {
    await Model.deleteOne({ user: id }).session(session);
  }
};

//* SOCKET-UTILS
export const emit = ({ from, to }, event) => io.to(to).emit(event, { from });
