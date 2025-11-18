import uploadMemory from '../../../middlewares/uploadMemory';
import {
  canEdit,
  checkDuplicateUser,
  isCurrentUser,
  isGuest,
  isUser,
  requireAdmin
} from '../../../middlewares/user.middlewares';
import * as userController from '../../controllers/user/user.controller';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', [requireAdmin], userController.getAllUsers);
userRouter.get('/:id', [isUser], userController.getUserById);
userRouter.get('/search', [isUser], userController.searchUsers);

userRouter.post('register', [checkDuplicateUser], userController.registerUser);
userRouter.post('/login', [isGuest], userController.loginUser);

userRouter.patch(
  '/img/:id',
  [canEdit, uploadMemory.single('img')],
  userController.uploadProfilePicture
);
userRouter.patch(
  '/:id',
  [canEdit, checkDuplicateUser],
  userController.editUser
);

userRouter.delete('/:id', [canEdit], userController.deleteUser);

export default userRouter;
