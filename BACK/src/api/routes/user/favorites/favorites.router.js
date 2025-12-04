import { Router } from 'express';
import { requireAndValidateReqBody } from '../../../../middlewares/middlewares.js';
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
  .patch(
    '/media',
    [requireAndValidateReqBody({ required: ['mediaId'] })],
    addMediaToFavorites
  )
  .patch(
    '/media/remove',
    [requireAndValidateReqBody({ required: ['mediaId'] })],
    removeMediaFromFavorites
  );

export default favoritesRouter;
