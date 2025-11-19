//* GENERAL
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
//!   ERRORS
export const userNotFoundError = customError(404, 'user not found');

// CONSTS
export const allowedEditFields = [
  'userName',
  'emailAddress',
  'nickName',
  'country',
  'languageCode',
  'isSharedInfo.watchList',
  'isSharedInfo.favorites',
  'isSharedInfo.friends'
];
