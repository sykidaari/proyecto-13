import { model } from 'mongoose';
import { mediaRef, userRef } from '../../../../utils/modelUtils';
import { buildSchema, ref } from '../../../../utils/modelUtils';

const FavoritesSchema = buildSchema(
  {
    user: userRef,

    genres: [String],
    medias: [mediaRef]
  },
  'favorites'
);

const Favorites = model('Favorites', FavoritesSchema, 'favorites');

export default Favorites;
