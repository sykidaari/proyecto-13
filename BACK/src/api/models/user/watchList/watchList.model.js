import { model } from 'mongoose';
import {
  buildUserChildSchema,
  mediaRef
} from '../../../../utils/modelUtils.js';

const WatchListSchema = buildUserChildSchema(
  {
    medias: [mediaRef]
  },
  'watchList'
);

const WatchList = model('WatchLists', WatchListSchema);

export default WatchList;
