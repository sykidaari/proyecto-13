import { model } from 'mongoose';
import { buildSchema, requiredString } from '../../../utils/modelUtils.js';

const MediaSchema = buildSchema(
  {
    _id: { type: String, required: true },

    showType: { type: String, enum: ['movie', 'series'] },

    title: { languageCode: requiredString, text: requiredString },

    imageSet: {
      // all in w720
      verticalPoster: String,
      horizontalPoster: String,
      verticalBackdrop: String,
      horizontalBackdrop: String
    },

    details: {
      releaseYear: String,
      overview: String,
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
          services: [requiredString]
        }
      ]
    }
  },
  'medias'
);

const Media = model('Media', MediaSchema);

export default Media;
