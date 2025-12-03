import uploadMemory from '../../../middlewares/uploadMemory.js';
import {
  setAccessFlags,
  setIsOwner,
  requireAdmin,
  requireUser,
  requireGuest,
  requireOwner,
  requireOwnerOrAdmin
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
  checkDuplicateUser,
  requireReqBody,
  validateBody
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
      validateBody([
        'userName',
        'emailAddress',
        'nickName',
        'password',
        'country',
        'languageCode'
      ]),
      checkDuplicateUser
    ],
    registerUser
  )
  .post(
    '/login',
    [requireGuest, validateBody(['userName', 'emailAddress', 'password'])],
    loginUser
  )

  .use('/:id', [setIsOwner])

  .get('/:id', [requireUser], getUserById)

  .patch(
    '/:id/password',
    [requireOwner, validateBody(['currentPassword', 'newPassword'])],
    changePassword
  )
  .patch(
    '/:id/img',
    [requireOwner, uploadMemory.single('img')],
    uploadProfilePicture
  )
  .patch(
    // BODY IS VALIDATED IN CONTROLLER BECAUSE IT'S DYNAMIC
    '/:id',
    [requireOwnerOrAdmin, requireReqBody, checkDuplicateUser],
    editUser
  )

  .delete('/:id/img', [requireOwnerOrAdmin], deleteProfilePicture)
  .delete('/:id', [requireOwnerOrAdmin], deleteUser)

  .use('/:id', [requireOwnerOrAdmin], userChildrenRouter);

export default userRouter;
