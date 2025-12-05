import { model } from 'mongoose';
import {
  buildSchema,
  mediaRef,
  requiredString,
  userRefRequiredUnique
} from '../../../utils/modelUtils.js';
import ERR from '../../../constants/errorCodes.js';

export const sessionParameters = {
  sessionName: { type: String, minlength: 3, maxlength: 30 },

  includedMedia: {
    type: {
      mediaType: {
        ...requiredString,
        enum: ['movies', 'series', 'all'],
        default: 'all'
      },
      genres: [String]
    },
    required: true
  }
};

const SessionSchema = buildSchema(
  {
    ...sessionParameters,

    participants: {
      type: [
        {
          user: userRefRequiredUnique,

          hearts: [mediaRef],

          hasWatched: [mediaRef],
          ratesGood: [mediaRef],
          ratesBad: [mediaRef]
        }
      ],
      validate: {
        validator: (array) => array.length <= 6,
        message: ERR.session.validation.tooManyParticipants
      }
    },

    discardedMedias: [mediaRef],
    matchedMedias: [mediaRef]
  },
  'sessions'
);

const Session = model('Session', SessionSchema);

export default Session;
