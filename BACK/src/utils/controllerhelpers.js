// USERS

export const isCurrentUser = (req, currentUserId) => {
  if (!req.user) return false;
  return String(req.user._id) === String(currentUserId);
};

export const isAdmin = (req) => {
  return req.user && req.user.account.role === 'admin';
};

export const buildPublicProjection = (user) => {
  const projection = [
    'account.userName',
    'account.nickName',
    'account.country',
    'account.img'
  ];
};
