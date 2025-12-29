import {
  generateAccessToken,
  generateRefreshToken,
  hashRefreshToken
} from '../../../config/auth.js';
import {
  deleteFromCloudinary,
  uploadToCloudinary
} from '../../../utils/cloudinaryUtils.js';
import {
  childModels,
  clearRefreshCookie,
  createAdditionalUserDocs,
  createSession,
  customError,
  deleteAdditionalUserDocs,
  userNotFoundError,
  validateAndApplyUpdates
} from '../../../utils/controllerUtils.js';
import User from '../../models/user/user.model.js';
import { compare as compareEncryption } from 'bcrypt';
import withTransaction from '../../../utils/transactionWrapper.js';
import ERR from '../../../constants/domain/errorCodes.js';
import OK from '../../../constants/domain/successCodes.js';

// * GET

// ? ADMIN ONLY
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('+role +emailAddress').lean();

    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  const {
    params: { userId },
    isAdmin,
    isSelf
  } = req;

  const projection = isAdmin
    ? '+role +emailAddress +countryCode +countryCode'
    : isSelf
    ? '+accountSettings +languageCode +countryCode +emailAddress'
    : null;

  try {
    const user = await User.findById(userId).select(projection).lean();

    if (!user) throw userNotFoundError;

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// PRE-REGISTER/PRE-UPDATE, for a modular front-end register experience!
const checkAvailability = (key) => {
  return async (req, res, next) => {
    const value = req.query[key];

    if (!value) {
      return res.json({ available: null });
    }

    try {
      const exists = await User.findOne({ [key]: value });

      res.json({ available: !exists, key, value });
    } catch (err) {
      next(err);
    }
  };
};
export const checkUserNameAvailability = checkAvailability('userName');
export const checkEmailAvailability = checkAvailability('emailAddress');

export const searchUsers = async (req, res, next) => {
  const { userName } = req.query;

  try {
    if (!userName) return res.status(200).json([]);

    const users = await User.find({
      userName: { $regex: `^${userName}`, $options: 'i' }
    }).limit(20);

    return res.json(users);
  } catch (err) {
    next(err);
  }
};

// * POST

export const registerUser = async (req, res, next) => {
  const { rememberMe, ...registerFields } = req.body;

  try {
    const { user, additionalDocs } = await withTransaction(async (session) => {
      const [user] = await User.create([{ ...registerFields, role: 'user' }], {
        session
      });

      const additionalDocs = await createAdditionalUserDocs(
        session,
        user._id,
        childModels
      );

      return { user, additionalDocs };
    });

    const userObject = user.toObject();
    delete userObject.password;

    const accessToken = generateAccessToken(userObject._id);

    await createSession(res, userObject._id, {
      rememberMe
    });

    return res.status(201).json({
      message: OK.user.registered,
      user: userObject,
      accessToken,
      additionalDocs
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  const { userName, emailAddress, password, rememberMe } = req.body;

  if (!userName && !emailAddress) {
    throw customError(400, ERR.user.validation.missingCredentials, {
      fields: 'userName, emailAddress'
    });
  }

  try {
    const user = await User.findOne({
      $or: [{ userName }, { emailAddress }]
    })
      .select('+password +accountSettings +emailAddress')
      .lean();

    if (!user) throw userNotFoundError;

    const wrongPassword = !(await compareEncryption(password, user.password));
    if (wrongPassword)
      throw customError(401, ERR.user.auth.incorrectCredentials);

    delete user.password;

    const accessToken = generateAccessToken(user._id);

    await createSession(res, user._id, { rememberMe });

    return res
      .status(200)
      .json({ message: OK.user.loggedIn, user, accessToken });
  } catch (err) {
    next(err);
  }
};

// * PUT

export const uploadProfilePicture = async (req, res, next) => {
  const {
    params: { userId },
    file
  } = req;

  if (!file) throw customError(400, ERR.user.img.noneUploaded);

  try {
    const user = await User.findById(userId);
    if (!user) throw userNotFoundError;

    const imgUrl = await uploadToCloudinary(file.buffer, 'movieApp/users');
    if (user.img) await deleteFromCloudinary(user.img);

    user.img = imgUrl;
    await user.save();

    return res.status(200).json({
      message: OK.user.profilePictureUpdated,
      img: imgUrl
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProfilePicture = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) throw userNotFoundError;

    if (!user.img) throw customError(400, ERR.user.img.noneToDelete);

    await deleteFromCloudinary(user.img);

    user.img = null;
    await user.save();

    return res.status(200).json({
      message: OK.user.profilePictureDeleted
    });
  } catch (err) {
    next(err);
  }
};

// DOES NOT HANDLE IMG!
export const editUser = async (req, res, next) => {
  const {
    params: { userId },
    isSelf,
    isAdmin,
    body
  } = req;

  const allowedEditFields = ['userName', 'nickName'];

  if (isSelf)
    allowedEditFields.push(
      'emailAddress',
      'countryCode',
      'languageCode',
      'accountSettings.isSharedInfo.watchList',
      'accountSettings.isSharedInfo.favorites',
      'accountSettings.tutorialCompleted'
    );

  if (isAdmin) allowedEditFields.push('role');

  try {
    // PROJECTION HAS ALL EXCEPT IMG AND ROLE

    const user = await User.findById(userId);
    if (!user) throw userNotFoundError;

    const invalid = validateAndApplyUpdates(user, body, allowedEditFields);
    if (invalid)
      throw customError(400, ERR.body.invalidField, {
        field: invalid
      });

    await user.save();
    const userObject = user.toObject();
    delete userObject.password;

    return res.status(200).json({
      message: OK.user.updated,
      user: userObject
    });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req, res, next) => {
  const {
    params: { userId },
    body: { currentPassword, newPassword }
  } = req;

  try {
    const user = await User.findById(userId).select('+password');
    if (!user) throw userNotFoundError;

    const matches = await compareEncryption(currentPassword, user.password);
    if (!matches) throw customError(400, ERR.user.auth.incorrectPassword);

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      message: OK.user.passwordChanged
    });
  } catch (err) {
    next(err);
  }
};

// DELETE

export const logoutUser = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      clearRefreshCookie(res);
      return res.sendStatus(200);
    }

    const tokenHash = hashRefreshToken(refreshToken);

    await UserAccessSession.deleteOne({ tokenHash });

    clearRefreshCookie(res);

    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const { img } = await withTransaction(async (session) => {
      const user = await User.findById(userId).session(session);
      if (!user) throw userNotFoundError;

      const img = user.img;

      await deleteAdditionalUserDocs(session, userId, childModels);

      await user.deleteOne({ session });

      return { img };
    });

    if (img) await deleteFromCloudinary(img);

    return res.status(200).json({
      message: OK.user.deleted
    });
  } catch (err) {
    next(err);
  }
};
