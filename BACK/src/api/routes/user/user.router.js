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

userRouter

  .get('/', [requireAdmin], getAllUsers)

  .get('/search', [requireUser], searchUsers)

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
          'country',
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
  )

  .use('/:userId', [setIsSelf])

  .get('/:userId', [requireUser], getUserById)

  .patch(
    '/:userId/password',
    [
      requireSelf,
      requireAndValidateReqBody({
        required: ['currentPassword', 'newPassword']
      })
    ],
    changePassword
  )
  .patch(
    '/:userId/img',
    [requireSelf, uploadMemory.single('img')],
    uploadProfilePicture
  )
  .patch(
    // BODY IS VALIDATED IN CONTROLLER BECAUSE IT'S DYNAMIC
    '/:userId',
    [requireSelfOrAdmin, requireReqBody],
    editUser
  )

  .delete('/:userId/img', [requireSelfOrAdmin], deleteProfilePicture)
  .delete('/:userId', [requireSelfOrAdmin], deleteUser)

  .use('/:userId', [requireSelfOrAdmin], userChildrenRouter);

export default userRouter;
