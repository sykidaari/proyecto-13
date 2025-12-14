import { model } from 'mongoose';
import COUNTRY_CODES from '../../../constants/countryCodes';
import { buildSchema, requiredString } from '../../../utils/modelUtils';

const TopShowsImgsSchema = buildSchema(
  {
    country: { requiredString, enum: COUNTRY_CODES },

    service: requiredString,

    shows: [
      {
        verticalPoster,
        horizontalPoster,
        verticalBackdrop,
        horizontalBackdrop
      }
    ]
  },
  'topShowImgs'
);

const TopShowImgs = model('TopShowImgs', TopShowsImgsSchema);

export default TopShowImgs;
