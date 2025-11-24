import { Router } from 'express';
import { validateBody } from '../../../../middlewares/middlewares.js';
import {
  addGenreToFavorites,
  addMediaToFavorites,
  getFavorites,
  removeGenreFromFavorites,
  removeMediaFromFavorites
} from '../../../controllers/user/favorites/favorites.controller.js';

const favoritesRouter = Router();

favoritesRouter
  .get('/', getFavorites)

  .patch('/genre', [validateBody(['genre'])], addGenreToFavorites)
  .patch('/genre/remove', [validateBody(['genre'])], removeGenreFromFavorites)
  .patch('/media', [validateBody(['mediaId'])], addMediaToFavorites)
  .patch(
    '/media/remove',
    [validateBody(['mediaId'])],
    removeMediaFromFavorites
  );

export default favoritesRouter;
