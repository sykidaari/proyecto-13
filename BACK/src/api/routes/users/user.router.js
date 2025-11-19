import uploadMemory from '../../../middlewares/uploadMemory.js';
import {
  checkDuplicateUser,
  setAccessFlags,
  setIsOwner,
  requireAdmin,
  requireUser,
  requireGuest,
  requireOwner,
  requireOwnerOrAdmin
} from '../../../middlewares/user.middlewares.js';
import {
  changePassword,
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

const userRouter = Router();

userRouter.use([setAccessFlags]);
userRouter.use('/:id', [setIsOwner]);

userRouter.get('/', [requireAdmin], getAllUsers);
userRouter.get('/:id', [requireUser], getUserById);
userRouter.get('/search', [requireUser], searchUsers);

userRouter.post('/register', [requireGuest, checkDuplicateUser], registerUser);
userRouter.post('/login', [requireGuest], loginUser);

userRouter.patch('/:id/password', [requireOwner], changePassword);
userRouter.patch('/:id', [requireOwnerOrAdmin, checkDuplicateUser], editUser);
userRouter.patch(
  '/:id/img',
  [requireOwnerOrAdmin, uploadMemory.single('img')],
  uploadProfilePicture
);

userRouter.delete('/:id', [requireOwnerOrAdmin], deleteUser);

userRouter.use('/:id/appSettings', [requireOwner], appSettingsRouter);

export default userRouter;
