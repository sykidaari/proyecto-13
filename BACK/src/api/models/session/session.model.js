import { model } from 'mongoose';
import {
  buildSchema,
  mediaRef,
  userRefRequired
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
        user: userRefRequired,

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

const Session = model('Session', SessionSchema, 'sessions');

export default Session;
