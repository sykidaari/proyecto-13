import { model } from 'mongoose';
import {
  buildSchema,
  buildUserChildSchema,
  mediaRef,
  userRefRequiredUnique
} from '../../../../utils/modelUtils.js';

const FavoritesSchema = buildUserChildSchema(
  {
    genres: [String],
    medias: [mediaRef]
  },
  'favorites'
);

const Favorites = model('Favorites', FavoritesSchema);

export default Favorites;
