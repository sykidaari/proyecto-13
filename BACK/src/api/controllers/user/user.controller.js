import { generateToken } from '../../../config/jwt';
import {
  deleteFromCloudinary,
  uploadToCloudinary
} from '../../../utils/cloudinaryUtils';
import {
  customError,
  isAdmin,
  isCurrentUser,
  missingFields,
  userNotFoundError
} from '../../../utils/controllerUtils';
import User from '../../models/user/user.model';
import { compare as compareEncryption } from 'bcrypt';

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
  const { id } = req.params;

  const projection = isAdmin(req)
    ? '+role'
    : isCurrentUser(req, id)
    ? '+accountSettings +languageCode'
    : null;

  try {
    const user = await User.findById(id).select(projection).lean();

    if (!user) return next(userNotFoundError);

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
  if (missingFieldErr) return next(missingFieldErr);

  try {
    const user = new User({
      ...fields,
      role: 'user'
    });

    await user.save();
    const userObject = user.toObject();

    const token = generateToken(userObject._id);

    return res.status(201).json({
      message: 'user registered successfully',
      user: userObject,
      token
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

    if (!user) return next(userNotFoundError);

    const wrongPassword = !(await compareEncryption(password, user.password));
    if (wrongPassword) return next(customError(401, 'incorrect credentials'));

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
  const { file, user } = req;

  try {
    if (!file) return next(customError(400, 'no file uploaded'));

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

// DOES NOT HANDLE IMG!
export const editUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    // PROJECTION HAS ALL EXCEPT IMG AND ROLE
    const user = await User.findById(id).select(
      '+password +languageCode +accountSettings -img'
    );
    if (!user) return next(userNotFoundError);

    for (const [key, updateValue] of Object.entries(req.body)) {
      user[key] = updateValue;
    }

    await user.save();
    const userObject = user.toObject();

    return res.status(200).json({
      message: 'user updated successfully',
      user: userObject
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id).lean();
    if (!user) return next(userNotFoundError);

    if (user.img) await deleteFromCloudinary(user.img);

    return res.status(200).json({
      message: 'user deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};
