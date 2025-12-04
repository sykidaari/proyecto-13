import Session from '../api/models/session/session.model.js';
import { customError } from '../utils/controllerUtils.js';

// HELPER
const isEmpty = (body) => {
  if (Object.keys(body).length === 0) {
    return true;
  }
};
const isEmptyError = customError(400, 'request body required');

//* GENERAL
export const validateBody = (allowed) => (req, res, next) => {
  const { body } = req;

  if (isEmpty(body)) {
    throw isEmptyError;
  }

  for (const [key, value] of Object.entries(body)) {
    if (allowed.includes(key)) continue;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      for (const nestedKey of Object.keys(value)) {
        const path = `${key}.${nestedKey}`;

        if (!allowed.includes(path)) {
          throw customError(400, `Invalid field: ${path}`);
        }
      }
      continue;
    }

    throw customError(400, `Invalid field: ${key}`);
  }

  next();
};

// FOR CASES WHERE VALIDATION MUST BE DONE IN CONTROLLER
export const requireReqBody = (req, res, next) => {
  if (isEmpty(req.body)) {
    throw isEmptyError;
  }
};

//* USER
export const checkDuplicateUser = async (req, res, next) => {
  const { userName, emailAddress } = req.body;

  try {
    const duplicateUser = await User.findOne({
      $or: [{ userName }, { emailAddress }]
    }).lean();
    if (duplicateUser)
      throw customError(409, 'username or email already exists');

    next();
  } catch (err) {
    next(err);
  }
};

//* USER CHILDREN
export const findOrCreateByUser = (Model) => async (req, res, next) => {
  const { userId } = req.params;

  let doc;
  let status = 200;

  try {
    doc = await Model.findOne({
      user: userId
    });

    if (!doc) {
      const created = await Model.create({ user: userId });
      doc = created;

      // ONLY GET GIVES 201 if created
      if (req.method === 'GET') status = 201;
    }

    req.doc = doc;
    req.status = status;
    next();
  } catch (err) {
    next(err);
  }
};

//* SESSION

export const findSessionById = async (req, res, next) => {
  const {
    params: { sessionId }
  } = req;

  try {
    const session = await Session.findById(sessionId);

    if (!session) throw customError(404, 'session not found');

    req.session = session;
  } catch (err) {
    next(err);
  }
};
