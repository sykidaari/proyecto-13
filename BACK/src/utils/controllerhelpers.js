// USERS

const isCurrentUser = (req, userId) => {
  return req.user && req.user._id.equals(userId);
};

const isAdmin = (req) => {
  return req.user && req.user.account.role === 'admin';
};

const buildPublicProjection = (user) => {
  const projection = [
    'account.userName',
    'account.nickName',
    'account.country',
    'account.img'
  ];
};
