import { model } from 'mongoose';
import {
  buildUserChildSchema,
  mediaRef
} from '../../../../utils/modelUtils.js';

const WatchListsSchema = buildUserChildSchema(
  {
    medias: [mediaRef]
  },
  'watchLists'
);

const WatchLists = model('WatchLists', WatchListsSchema);

export default WatchLists;
