import ERR from '../../../constants/errorCodes.js';
import streamingAvailabilityService from '../../../services/external/streamingAvailability.service.js';
import { customError } from '../../../utils/controllerUtils.js';
import Media from '../../models/media/media.model.js';

//* GET

//? ADMIN ONLY
export const getAllMedias = async (req, res, next) => {
  try {
    const medias = await Media.find().lean();

    return res.status(200).json(medias);
  } catch (err) {
    next(err);
  }
};

// proxy for front
export const fetchServiceMedias = async (req, res, next) => {
  const {
    countryCode,
    languageCode,
    showType,
    genres,
    services,
    keyword,
    cursor
  } = req.query;

  if (!countryCode)
    throw customError(400, ERR.media.missingQuery, { query: 'countryCode' });
  if (!languageCode)
    throw customError(400, ERR.media.missingQuery, { query: 'languageCode' });

  const parsedQuery = {
    countryCode,
    languageCode,
    showType,
    keyword,
    cursor,
    genres: genres?.split(','),
    services: services?.split(',')
  };

  try {
    const medias = await streamingAvailabilityService.getShows(parsedQuery);

    return res.status(200).json(medias);
  } catch (err) {
    next(err);
  }
};

export const getMediaById = async (req, res, next) => {
  const { mediaId } = req.params;

  try {
    const media = await Media.findById(mediaId).lean();

    if (!media) throw customError(404, ERR.media.notFound);

    return res.status(200).json(media);
  } catch (err) {
    next(err);
  }
};
