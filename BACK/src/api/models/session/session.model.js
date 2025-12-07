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
    mediaType: {
      ...requiredString,
      enum: ['movies', 'series', 'all'],
      default: 'all'
    },
    genres: [String],

    availability: {
      services: { type: [String], required: true },
      region: { type: String, required: true }
    }
  }
};

const SessionSchema = buildSchema(
  {
    ...sessionParameters,

    participants: {
      type: [
        {
          user: userRefRequiredUnique,

          matchProposals: [mediaRef],

          hasWatched: [mediaRef],
          likes: [mediaRef]
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
