import { model } from 'mongoose';
import { buildSchema, mediaRef, ref } from '../../../../utils/modelUtils';
import { userRef } from '../../../../utils/modelUtils';

const WatchListsSchema = buildSchema(
  {
    user: userRef,

    medias: [mediaRef]
  },
  'watchLists'
);

const WatchLists = model('WatchLists', WatchListsSchema, 'watchLists');

export default WatchLists;
