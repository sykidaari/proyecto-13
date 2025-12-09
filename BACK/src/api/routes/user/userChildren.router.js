import { Router } from 'express';
import appSettingsRouter from './appSettings/appSettings.router.js';
import favoritesRouter from './favorites/favorites.router.js';
import { findOrCreateByUser } from '../../../middlewares/middlewares.js';
import AppSettings from '../../models/user/appSettings/appsettings.model.js';
import Favorites from '../../models/user/favorites/favorites.model.js';
import Friends from '../../models/user/friends/friends.model.js';
import friendsRouter from './friends/friends.router.js';
import requestsRouter from './requests/requests.router.js';
import Requests from '../../models/user/requests/requests.model.js';
import WatchList from '../../models/user/watchList/watchList.model.js';
import watchListRouter from './watchList/watchList.router.js';
import SessionsList from '../../models/user/sessionsList/sessionsList.model.js';
import sessionsListRouter from './sessionsList/sessionsList.router.js';
import WatchedMedias from '../../models/user/watchedMedias/watchedMedias.model.js';
import watchedMediasRouter from './watchedMedias/watchedMedias.router.js';
import LikedMedias from '../../models/user/likedMedias/likedMedias.model.js';
import likedMediasRouter from './likedMedias/likedMedias.router.js';
import {
  requireSelfOrAdmin,
  requireSelfOrAdminOrFriendOrSessionParticipant,
  requireSelfOrAdminOrFriendWithPrivacy
} from '../../../middlewares/access.js';

const userChildrenRouter = Router({ mergeParams: true });
const privateRouter = Router({ mergeParams: true });

userChildrenRouter.use('/private', [requireSelfOrAdmin], privateRouter);

userChildrenRouter
  .use(
    '/favorites',
    [requireSelfOrAdminOrFriendWithPrivacy, findOrCreateByUser(Favorites)],
    favoritesRouter
  )
  .use(
    '/watch-list',
    [requireSelfOrAdminOrFriendWithPrivacy, findOrCreateByUser(WatchList)],
    watchListRouter
  )

  .use(
    '/watched-medias',
    [
      requireSelfOrAdminOrFriendOrSessionParticipant,
      findOrCreateByUser(WatchedMedias)
    ],
    watchedMediasRouter
  )
  .use(
    '/liked-medias',
    [
      requireSelfOrAdminOrFriendOrSessionParticipant,
      findOrCreateByUser(LikedMedias)
    ],
    likedMediasRouter
  );

privateRouter
  .use('/requests', [findOrCreateByUser(Requests)], requestsRouter)
  .use('/appSettings', [findOrCreateByUser(AppSettings)], appSettingsRouter)
  .use('/friends', [findOrCreateByUser(Friends)], friendsRouter)
  .use('/sessions-list', [
    findOrCreateByUser(SessionsList),
    sessionsListRouter
  ]);

export default userChildrenRouter;
