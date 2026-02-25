import uploadMemory from '../../../middlewares/uploadMemory.js';
import {
  requireAdmin,
  requireUser,
  requireGuest,
  requireSelf,
  requireSelfOrAdmin,
  setIsSelf
} from '../../../middlewares/access.js';
import {
  changePassword,
  checkEmailAvailability,
  checkUserNameAvailability,
  deleteProfilePicture,
  deleteUser,
  editUser,
  getAllUsers,
  getUserById,
  loginUser,
  logoutUser,
  registerUser,
  searchUsers,
  uploadProfilePicture
} from '../../controllers/user/user.controller.js';
import { Router } from 'express';
import {
  requireReqBody,
  requireAndValidateReqBody
} from '../../../middlewares/middlewares.js';
import userChildrenRouter from './userChildren.router.js';
import rateLimit from '../../../middlewares/rateLimit.js';

const userRouter = Router();
const existingUserRouter = Router({ mergeParams: true });

userRouter
  .get('/', [requireAdmin], getAllUsers)

  .get('/search', [requireUser], searchUsers)

  .get('/check-username', checkUserNameAvailability)
  .get('/check-email', checkEmailAvailability)

  .post(
    '/register',
    [
      rateLimit.strict,
      requireGuest,
      requireAndValidateReqBody({
        required: [
          'userName',
          'emailAddress',
          'nickName',
          'password',
          'countryCode',
          'languageCode'
        ]
      })
    ],
    registerUser
  )
  .post(
    '/login',
    [
      rateLimit.strict,
      requireGuest,
      requireAndValidateReqBody({
        required: 'password',
        optional: ['userName', 'emailAddress', 'rememberMe']
      })
    ],
    loginUser
  )
  .delete('/', [requireUser], logoutUser);

userRouter.use('/:userId', [requireUser, setIsSelf], existingUserRouter);

existingUserRouter
  .get('/', getUserById)

  .patch(
    // BODY IS VALIDATED IN CONTROLLER BECAUSE IT'S DYNAMIC
    '/',
    [requireSelfOrAdmin, requireReqBody],
    editUser
  )

  .patch(
    '/password',
    [
      requireSelf,
      requireAndValidateReqBody({
        required: ['currentPassword', 'newPassword']
      })
    ],
    changePassword
  )
  // PROFILE PICTURE
  .patch(
    '/img',
    [requireSelf, uploadMemory.single('img')],
    uploadProfilePicture
  )
  .delete('/img', [requireSelfOrAdmin], deleteProfilePicture)

  .delete('/', [requireSelfOrAdmin], deleteUser)

  // CHILD ROUTES
  .use('/', userChildrenRouter);

export default userRouter;
