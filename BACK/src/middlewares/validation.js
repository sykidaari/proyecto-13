import { requireAndValidateReqBody } from './middlewares.js';

// COMMON BODY VALIDATION MIDDLEWARES STORED HERE. NOT REUSED ONES ARE IN ROUTER FILES

export const validateFullMediaData = requireAndValidateReqBody({
  required: ['mediaId', 'media.title', 'languageCode'],
  optional: [
    'media.showType',

    'media.imageSet.verticalPoster',
    'media.imageSet.horizontalPoster',
    'media.imageSet.verticalBackdrop',
    'media.imageSet.horizontalBackdrop',

    'media.details.releaseYear',
    'media.details.overview',
    'media.details.genres',
    'media.details.rating',

    'media.details.directors',
    'media.details.creators',
    'media.details.cast',
    'media.details.runtime',
    'media.details.seasonCount',

    'media.details.streamingOptions.country',
    'media.details.streamingOptions.services'
  ]
});

export const validateMediaId = requireAndValidateReqBody({
  required: 'mediaId'
});

export const validateOtherUserId = requireAndValidateReqBody({
  required: 'otherUserId'
});
