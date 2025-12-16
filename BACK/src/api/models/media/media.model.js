import { model, Schema } from 'mongoose';
import { buildSchema, requiredString } from '../../../utils/modelUtils.js';

const MediaSchema = buildSchema(
  {
    _id: { type: String, required: true },

    showType: { type: String, enum: ['movie', 'series'] },

    titles: {
      // key is languageCode
      type: Map,
      of: requiredString
    },

    imageSet: {
      // all in w720
      verticalPoster: String,
      horizontalPoster: String,
      verticalBackdrop: String,
      horizontalBackdrop: String
    },

    details: {
      releaseYear: String,

      overview: {
        // key is languageCode
        type: Map,
        of: String
      },

      genres: [String],
      rating: String,

      directors: [String],
      creators: [String],
      cast: [String],
      runtime: String,
      seasonCount: String,

      streamingOptions: [
        {
          country: requiredString,
          services: {
            // key is service.id
            type: Map,
            of: new Schema({
              mediaLink: String
            })
          }
        }
      ]
    }
  },
  'medias'
);

const Media = model('Media', MediaSchema);

export default Media;
