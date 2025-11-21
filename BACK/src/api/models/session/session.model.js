import { model } from 'mongoose';
import {
  buildSchema,
  mediaRef,
  userRefRequiredUnique
} from '../../../utils/modelUtils';

const SessionSchema = buildSchema(
  {
    includedMedia: {
      mediaType: {
        ...requiredString,
        enum: ['movies', 'series', 'both'],
        genres: [String]
      }
    },

    participants: [
      {
        user: userRefRequiredUnique,

        hearts: [mediaRef],

        hasWatched: [mediaRef],
        ratesGood: [mediaRef],
        ratesBad: [mediaRef]
      }
    ],

    discardedMedias: [mediaRef],
    matchedMedias: [mediaRef]
  },
  'sessions'
);

const Session = model('Session', SessionSchema);

export default Session;
