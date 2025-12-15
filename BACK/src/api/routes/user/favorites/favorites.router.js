import { Router } from 'express';
import { requireAndValidateReqBody } from '../../../../middlewares/middlewares.js';
import {
  addGenreToFavorites,
  addMediaToFavorites,
  getFavorites,
  removeGenreFromFavorites,
  removeMediaFromFavorites
} from '../../../controllers/user/favorites/favorites.controller.js';
import {
  validateFullMediaData,
  validateMediaId
} from '../../../../middlewares/validation.js';

const favoritesRouter = Router();

favoritesRouter
  .get('/', getFavorites)

  .patch(
    '/genre',
    [requireAndValidateReqBody({ required: ['genre'] })],
    addGenreToFavorites
  )
  .patch(
    '/genre/remove',
    [requireAndValidateReqBody({ required: ['genre'] })],
    removeGenreFromFavorites
  )
  .patch('/media', [validateFullMediaData], addMediaToFavorites)
  .patch('/media/remove', [validateMediaId], removeMediaFromFavorites);

export default favoritesRouter;
