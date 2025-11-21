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
  try {
    const { body } = req;

    if (isEmpty(body)) {
      return next(isEmptyError);
    }

    for (const [key, value] of Object.entries(body)) {
      if (allowed.includes(key)) continue;

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        for (const nestedKey of Object.keys(value)) {
          const path = `${key}.${nestedKey}`;

          if (!allowed.includes(path)) {
            return next(customError(400, `Invalid field: ${path}`));
          }
        }
        continue;
      }

      return next(customError(400, `Invalid field: ${key}`));
    }

    next();
  } catch (err) {
    next(err);
  }
};

// FOR CASES WHERE VALIDATION MUST BE DONE IN CONTROLLER
export const requireReqBody = (req, res, next) => {
  if (isEmpty(req.body)) {
    return next(isEmptyError);
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
      return next(customError(409, 'username or email already exists'));

    next();
  } catch (err) {
    next(err);
  }
};
