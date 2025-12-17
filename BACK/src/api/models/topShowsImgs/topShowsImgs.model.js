import { model } from 'mongoose';
import COUNTRY_CODES from '../../../constants/countryCodes.js';
import { buildSchema, requiredString } from '../../../utils/modelUtils.js';

const TopShowsImgsSchema = buildSchema(
  {
    country: { ...requiredString, enum: COUNTRY_CODES },

    service: requiredString,

    shows: [
      {
        _id: false,
        // all in w720
        verticalPoster: String,
        horizontalPoster: String,
        verticalBackdrop: String,
        horizontalBackdrop: String
      }
    ]
  },
  'topShowImgs'
);

TopShowsImgsSchema.index({ country: 1, service: 1 }, { unique: true });

const TopShowsImgs = model('TopShowsImgs', TopShowsImgsSchema);

export default TopShowsImgs;
