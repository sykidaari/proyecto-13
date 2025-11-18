import { model } from 'mongoose';
import {
  buildSchema,
  mediaRef,
  userRefRequired
} from '../../../../utils/modelUtils';

const WatchListsSchema = buildSchema(
  {
    user: userRefRequired,

    medias: [mediaRef]
  },
  'watchLists'
);

const WatchLists = model('WatchLists', WatchListsSchema, 'watchLists');

export default WatchLists;
