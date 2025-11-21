import { findOrCreateByUser } from '../../../../utils/controllerUtils';
import Favorites from '../../../models/user/favorites/favorites.model';

//* GET
export const getFavorites = async (req, res, next) => {
  const { _id: id } = req.user;
  try {
    const { doc: favorites, status } = await findOrCreateByUser(Favorites, id, {
      lean: true
    });

    return res.status(status).json(favorites);
  } catch (err) {
    next(err);
  }
};

//* PATCH

export const addGenreToFavorites = async (req, res, next) => {
  const {
    user: { _id: id },
    body: { genre }
  } = req;

  try {
    const { doc: favorites } = await findOrCreateByUser(Favorites, id);

    if (!favorites.genres.includes(genre)) favorites.genres.push(genre);

    await favorites.save();

    return res.status(200).json({
      message: 'genre added',
      genres: favorites.genres
    });
  } catch (err) {
    next(err);
  }
};

export const removeGenreFromFavorites = async (req, res, next) => {
  const {
    user: { _id: id },
    body: { genre }
  } = req;
  try {
  } catch (err) {
    next(err);
  }
};

export const addMediaToFavorites = async (req, res, next) => {
  const {
    user: { _id: id },
    body: { mediaId }
  } = req;

  try {
    const { doc: favorites } = await findOrCreateByUser(Favorites, id);

    if (!favorites.medias.includes(mediaId)) favorites.medias.push(mediaId);

    await favorites.save();

    return res.status(200).json({
      message: 'media added',
      genres: favorites.medias
    });
  } catch (err) {
    next(err);
  }
};
