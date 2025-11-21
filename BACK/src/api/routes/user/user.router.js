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
import appSettingsRouter from './appSettings/appSettings.router.js';
import {
  checkDuplicateUser,
  requireReqBody,
  validateBody
} from '../../../middlewares/middlewares.js';

const userRouter = Router();

userRouter.use([setAccessFlags]);
userRouter.use('/:id', [setIsOwner]);

userRouter.get('/', [requireAdmin], getAllUsers);
userRouter.get('/:id', [requireUser], getUserById);
userRouter.get('/search', [requireUser], searchUsers);

userRouter.post(
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
);
userRouter.post(
  '/login',
  [requireGuest, validateBody(['userName', 'emailAddress', 'password'])],
  loginUser
);

userRouter.patch(
  '/:id/password',
  [requireOwner, validateBody(['currentPassword', 'newPassword'])],
  changePassword
);
userRouter.patch(
  '/:id/img',
  [requireOwner, uploadMemory.single('img')],
  uploadProfilePicture
);

// BODY IS VALIDATED IN CONTROLLER BECAUSE IT'S DYNAMIC
userRouter.patch(
  '/:id',
  [requireOwnerOrAdmin, requireReqBody, checkDuplicateUser],
  editUser
);

userRouter.delete('/:id/img', [requireOwnerOrAdmin], deleteProfilePicture);
userRouter.delete('/:id', [requireOwnerOrAdmin], deleteUser);

//* CHILD ROUTERS
userRouter.use('/:id/appSettings', [requireOwnerOrAdmin], appSettingsRouter);

export default userRouter;
