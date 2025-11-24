import { Router } from 'express';
import { requireOwnerOrAdmin } from '../../../middlewares/access.js';
import appSettingsRouter from './appSettings/appSettings.router.js';
import favoritesRouter from './favorites/favorites.router.js';
import { findOrCreateByUser } from '../../../middlewares/middlewares.js';
import AppSettings from '../../models/user/appSettings/appsettings.model.js';
import Favorites from '../../models/user/favorites/favorites.model.js';
import Friends from '../../models/user/friends/friends.model.js';
import friendsRouter from './friends/friends.router.js';
import requestsRouter from './requests/requests.router.js';
import Requests from '../../models/user/requests/requests.model.js';

// THIS ROUTER IS ONLY A SUB-INDEX
const userChildrenRouter = Router({ mergeParams: true });

userChildrenRouter
  .use([requireOwnerOrAdmin])
  .use('/appSettings', [findOrCreateByUser(AppSettings)], appSettingsRouter)
  .use('/favorites', [findOrCreateByUser(Favorites)], favoritesRouter)
  .use('/friends', [findOrCreateByUser(Friends)], friendsRouter)
  .use('/requests', [findOrCreateByUser(Requests)], requestsRouter);
export default userChildrenRouter;
