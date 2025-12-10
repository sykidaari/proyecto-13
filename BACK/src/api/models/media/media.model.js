import { model } from 'mongoose';
import { buildSchema, requiredString } from '../../../utils/modelUtils';

const MediaSchema = buildSchema(
  {
    _id: { type: String, required: true },

    showType: requiredString,

    title: { languageCode: requiredString, text: requiredString },

    imageSet: {
      verticalPoster: String,
      horizontalPoster: String,
      verticalBackdrop: String,
      horizontalBackdrop: String
    }
  },
  'medias'
);

export const Media = model('Media', MediaSchema);

export default Media;
