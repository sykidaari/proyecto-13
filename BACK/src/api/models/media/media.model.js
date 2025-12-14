import { model } from 'mongoose';
import { buildSchema, requiredString } from '../../../utils/modelUtils';

const MediaSchema = buildSchema(
  {
    _id: { type: String, required: true },

    showType: requiredString,

    title: { languageCode: requiredString, text: requiredString },

    imageSet: {
      // all in w720
      verticalPoster: String,
      horizontalPoster: String,
      verticalBackdrop: String,
      horizontalBackdrop: String
    },

    details: {
      releaseYear: requiredString,
      overview: requiredString,
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

export const Media = model('Media', MediaSchema);

export default Media;
