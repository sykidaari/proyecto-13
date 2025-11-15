import User from '../models/User/User';
import { handleControllerError as handleError } from '../../utils/errorHandlers';

// * GET

// ? ADMIN ONLY
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (error) {
    handleError({
      res,
      error,
      status: 500,
      method: 'GET',
      controllerName: 'getUsers',
      action: 'fetch users from DB'
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return handleCError({
        res,
        error: new Error('user not found'),
        status: 404,
        method: 'GET',
        controllerName: 'getUserById',
        action: 'check if user exists in DB'
      });
    }

    const owner = isCurrentUser(req, user._id);
    const admin = isAdmin(req);

    // Return full info only
    const projection = isOwner || admin ? '' : PUBLIC_USER_FIELDS;

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
