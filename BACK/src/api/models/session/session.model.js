import mongoose, { model } from 'mongoose';
import {
  buildSchema,
  mediaRef,
  userRefRequired
} from '../../../utils/modelUtils.js';
import ERR from '../../../constants/domain/errorCodes.js';

export const sessionParameters = {
  sessionName: { type: String, minlength: 3, maxlength: 30 },

  includedMedia: {
    mediaType: {
      type: String,
      enum: ['movie', 'series'],
      default: null
    },
    genres: [String],
    keyWord: { type: String, trim: true },

    availability: {
      services: { type: [String] },
      country: { type: String }
    }
  }
};

const SessionSchema = buildSchema(
  {
    ...sessionParameters,

    requestGroupId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      unique: true
    },

    participants: {
      type: [
        {
          user: userRefRequired,

          matchProposals: [mediaRef]
        }
      ],
      validate: {
        validator: (array) => array.length <= 6,
        message: ERR.session.validation.tooManyParticipants
      }
    },

    discardedMedias: [
      {
        mediaId: { ...mediaRef, required: true },
        user: userRefRequired,
        discardedAt: { type: Date, required: true }
      }
    ],
    matchedMedias: [mediaRef],

    lastMatchAt: {
      type: Date
    }
  },
  'sessions'
);

const Session = model('Session', SessionSchema);

export default Session;
