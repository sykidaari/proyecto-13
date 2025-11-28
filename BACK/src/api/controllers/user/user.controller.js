import { generateToken } from '../../../config/jwt.js';
import {
  deleteFromCloudinary,
  uploadToCloudinary
} from '../../../utils/cloudinaryUtils.js';
import {
  childModels,
  createAdditionalUserDocs,
  customError,
  deleteAdditionalUserDocs,
  missingFields,
  userNotFoundError,
  validateAndApplyUpdates
} from '../../../utils/controllerUtils.js';
import User from '../../models/user/user.model.js';
import { compare as compareEncryption } from 'bcrypt';
import withTransaction from '../../../utils/transactionWrapper.js';

// * GET

// ? ADMIN ONLY
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('+role').lean();

    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  const {
    params: { id },
    isAdmin,
    isCurrentUser
  } = req;

  const projection = isAdmin
    ? '+role'
    : isCurrentUser
    ? '+accountSettings +languageCode'
    : null;

  try {
    const user = await User.findById(id).select(projection).lean();

    if (!user) throw userNotFoundError;

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// https://www.youtube.com/watch?v=HsS0z3eOCSQ
// ! WILL MAKE WITH ATLAS SEARCH; NEED MODEL AND SOME USERS FIRST
export const searchUsers = async (req, res, next) => {
  const { query } = req.query;

  try {
    const users = await User.find({
      userName: ''
    });

    return res.json(users);
  } catch (err) {
    next(err);
  }
};

// * POST

export const registerUser = async (req, res, next) => {
  const { userName, emailAddress, nickName, password, country, languageCode } =
    req.body;

  const fields = {
    userName,
    emailAddress,
    nickName,
    password,
    country,
    languageCode
  };

  const missingFieldErr = missingFields(fields);
  if (missingFieldErr) throw missingFieldErr;

  try {
    const { user, additionalDocs } = await withTransaction(async (session) => {
      const [user] = await User.create([{ ...fields, role: 'user' }], {
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

    const token = generateToken(userObject._id);

    return res.status(201).json({
      message: 'user registered successfully',
      user: userObject,
      token,
      additionalDocs
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  const { userName, emailAddress, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ userName }, { emailAddress }]
    })
      .select('+password +accountSettings')
      .lean();

    if (!user) throw userNotFoundError;

    const wrongPassword = !(await compareEncryption(password, user.password));
    if (wrongPassword) throw customError(401, 'incorrect credentials');

    delete user.password;

    const token = generateToken(user._id);

    return res
      .status(200)
      .json({ message: 'user logged in successfully', user, token });
  } catch (err) {
    next(err);
  }
};

// * PUT

export const uploadProfilePicture = async (req, res, next) => {
  const {
    params: { id },
    file
  } = req;

  if (!file) throw customError(400, 'no file uploaded');

  try {
    const user = await User.findById(id);
    if (!user) throw userNotFoundError;

    const imgUrl = await uploadToCloudinary(file.buffer, 'movieApp/users');
    if (user.img) await deleteFromCloudinary(user.img);

    user.img = imgUrl;
    await user.save();

    return res.status(200).json({
      message: 'profile picture updated successfully',
      img: imgUrl
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProfilePicture = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) throw userNotFoundError;

    if (!user.img) throw customError(400, 'no profile picture to delete');

    await deleteFromCloudinary(user.img);

    user.img = null;
    await user.save();

    return res.status(200).json({
      message: 'profile picture deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

// DOES NOT HANDLE IMG!
export const editUser = async (req, res, next) => {
  const {
    params: { id },
    isCurrentUser,
    body
  } = req;

  const allowedEditFields = ['userName', 'nickName'];

  if (isCurrentUser)
    allowedEditFields.push(
      'emailAddress',
      'country',
      'languageCode',
      'isSharedInfo.watchList',
      'isSharedInfo.favorites',
      'isSharedInfo.friends'
    );

  try {
    // PROJECTION HAS ALL EXCEPT IMG AND ROLE

    const user = await User.findById(id);
    if (!user) throw userNotFoundError;

    const invalid = validateAndApplyUpdates(user, body, allowedEditFields);
    if (invalid) throw customError(400, `Invalid field: ${invalid}`);

    await user.save();
    const userObject = user.toObject();
    delete userObject.password;

    return res.status(200).json({
      message: 'user updated successfully',
      user: userObject
    });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req, res, next) => {
  const {
    params: { id },
    body: { currentPassword, newPassword }
  } = req;

  try {
    const user = await User.findById(id).select('+password');
    if (!user) throw userNotFoundError;

    const matches = await compareEncryption(currentPassword, user.password);
    if (!matches) throw customError(400, 'incorrect password');

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      message: 'password updated successfully'
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { img } = await withTransaction(async (session) => {
      const user = await User.findById(id).session(session);
      if (!user) throw userNotFoundError;

      const img = user.img;

      await deleteAdditionalUserDocs(session, id, childModels);

      await User.deleteOne({ _id: id }).session(session);

      return { img };
    });

    if (img) await deleteFromCloudinary(img);

    return res.status(200).json({
      message: 'user deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};
