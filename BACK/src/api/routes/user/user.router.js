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

const userRouter = Router();
const existingUserRouter = Router({ mergeParams: true });

userRouter.use('/:userId', [setIsSelf], existingUserRouter);

userRouter
  .get('/', [requireAdmin], getAllUsers)

  .get('/search', [requireUser], searchUsers)

  .get(
    '/check-userName',
    requireAndValidateReqBody({ required: 'userName' }),
    checkUserNameAvailability
  )
  .get(
    '/check-email',
    requireAndValidateReqBody({ required: 'emailAddress' }),
    checkEmailAvailability
  )

  .post(
    '/register',
    [
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
      requireGuest,
      requireAndValidateReqBody({
        required: 'password',
        optional: ['userName', 'emailAddress']
      })
    ],
    loginUser
  );

existingUserRouter
  .get('/', [requireUser], getUserById)

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
