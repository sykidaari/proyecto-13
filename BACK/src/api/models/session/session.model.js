import { model } from 'mongoose';
import {
  buildSchema,
  mediaRef,
  requiredString,
  userRefRequiredUnique
} from '../../../utils/modelUtils.js';
import ERR from '../../../constants/domain/errorCodes.js';

export const sessionParameters = {
  sessionName: { type: String, minlength: 3, maxlength: 30 },

  includedMedia: {
    mediaType: {
      ...requiredString,
      enum: ['movie', 'series'],
      default: null
    },
    genres: [String],
    keyWord: { type: String, trim: true },

    availability: {
      services: { type: [String], required: true },
      country: { type: String, required: true }
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

          matchProposals: [mediaRef]
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
