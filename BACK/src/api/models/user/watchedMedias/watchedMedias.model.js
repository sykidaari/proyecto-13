import { model } from 'mongoose';
import {
  buildUserChildSchema,
  mediaRef
} from '../../../../utils/modelUtils.js';

const WatchedMediasSchema = buildUserChildSchema(
  {
    medias: [mediaRef]
  },
  'watchedMedias'
);

const WatchedMedias = model('WatchedMedias', WatchedMediasSchema);

export default WatchedMedias;
