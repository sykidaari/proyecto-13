import { model } from 'mongoose';
import {
  buildUserChildSchema,
  mediaRef
} from '../../../../utils/modelUtils.js';

const LikedMediasSchema = buildUserChildSchema(
  {
    medias: [mediaRef]
  },
  'likedMedias'
);

const LikedMedias = model('LikedMedias', LikedMediasSchema);

export default LikedMedias;
