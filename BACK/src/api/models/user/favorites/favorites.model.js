import { model } from 'mongoose';
import {
  buildSchema,
  mediaRef,
  userRefRequired
} from '../../../../utils/modelUtils';

const FavoritesSchema = buildSchema(
  {
    user: userRefRequired,

    genres: [String],
    medias: [mediaRef]
  },
  'favorites'
);

const Favorites = model('Favorites', FavoritesSchema, 'favorites');

export default Favorites;
