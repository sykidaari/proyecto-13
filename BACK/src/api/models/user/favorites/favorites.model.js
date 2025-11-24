import { model } from 'mongoose';
import {
  buildUserChildSchema,
  mediaRef
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
