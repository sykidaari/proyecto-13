import User from '../../models/User/User';
import { handleControllerError as handleError } from '../../../utils/errorHandlers';
import { isAdmin, isCurrentUser } from '../../../utils/controllerhelpers';

// * GET

// ? ADMIN ONLY
export const geAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (error) {
    handleError({
      res,
      error,
      status: 500,
      method: 'GET',
      controllerName: 'getAllUsers',
      action: 'fetch users from DB'
    });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  const isOwner = isCurrentUser(req, id);
  const isAdmin = isAdmin(req);

  const projection = isAdmin
    ? null
    : isOwner
    ? '-role -password'
    : 'userName nickName country languageCode';

  try {
    const user = await User.findById(id).select(projection).lean();

    if (!user) {
      return handleError({
        res,
        error: new Error('user not found'),
        status: 404,
        method: 'GET',
        controllerName: 'getUserById',
        action: 'check if user exists in DB'
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    handleError({
      res,
      error,
      status: 500,
      method: 'GET',
      controllerName: 'getUserById',
      action: 'fetch user with _id from DB'
    });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { username } = req.query;
    if (!username)
      return handleError({
        res,
        error,
        status: 404,
        method: 'GET',
        controllerName: 'searchUsers',
        action: 'fetch users with username query from DB'
      });
  } catch (error) {}
};
