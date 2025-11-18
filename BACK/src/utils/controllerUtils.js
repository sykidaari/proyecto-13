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

//?   BOOLEANS
export const isCurrentUser = (req, currentUserId) => {
  if (!req.user) return false;
  return String(req.user._id) === String(currentUserId);
};

export const isAdmin = (req) => {
  return req.user && req.user.account.role === 'admin';
};
