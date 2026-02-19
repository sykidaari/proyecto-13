import Session from '../api/models/session/session.model.js';
import ERR from '../constants/domain/errorCodes.js';
import { customError, resolvePath } from '../utils/controllerUtils.js';
import Media from '../api/models/media/media.model.js';

// --- HELPER ------------------------------------
const isEmpty = (body) => {
  if (!body || Object.keys(body).length === 0) {
    return true;
  }
};
const isEmptyError = customError(400, ERR.body.missingBody);

// ---------------------------------------

//* --- GENERAL ------------------------------------

// FOR CASES WHERE VALIDATION MUST BE DONE IN CONTROLLER
export const requireReqBody = (req, res, next) => {
  if (isEmpty(req.body)) {
    throw isEmptyError;
  }

  next();
};

// ACCEPTS BOTH STRINGS AND ARRAYS
export const requireAndValidateReqBody = ({ required = [], optional = [] }) => {
  if (typeof required === 'string') required = [required];
  if (typeof optional === 'string') optional = [optional];

  const allowed = [...required, ...optional];

  return (req, res, next) => {
    const { body } = req;

    requireReqBody(req);

    for (const field of required) {
      if (!resolvePath(body, field)) {
        throw customError(400, ERR.body.missingField, { field });
      }
    }

    for (const [key, value] of Object.entries(body)) {
      if (allowed.includes(key)) continue;

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        for (const nestedKey of Object.keys(value)) {
          const full = `${key}.${nestedKey}`;
          if (!allowed.includes(full)) {
            throw customError(400, ERR.body.invalidField, { full });
          }
        }
        continue;
      }

      throw customError(400, ERR.body.invalidField, { key });
    }

    next();
  };
};

//* ---------------------------------------

//* --- USER CHILDREN ------------------------------------

export const findOrCreateByUser =
  (Model, reqProperty = 'doc') =>
  async (req, res, next) => {
    const { userId } = req.params;

    let status = 200;

    try {
      let doc = await Model.findOne({
        user: userId
      });

      if (!doc) {
        const created = await Model.create({ user: userId });
        doc = created;

        // ONLY GET GIVES 201 if created
        if (req.method === 'GET') status = 201;
      }

      req[reqProperty] = doc;
      req.status = status;
      next();
    } catch (err) {
      next(err);
    }
  };

//* ---------------------------------------

//* --- SESSION ------------------------------------

export const findSessionById = async (req, res, next) => {
  const {
    params: { sessionId }
  } = req;

  try {
    const session = await Session.findById(sessionId);

    if (!session) throw customError(404, ERR.session.notFound);

    req.session = session;
  } catch (err) {
    next(err);
  }
};

//* ---------------------------------------

//* --- MEDIA ------------------------------------

export const saveMedia = async (req, res, next) => {
  const {
    body: { mediaId, media: mediaData, languageCode }
  } = req;

  try {
    let media = await Media.findById(mediaId);
    if (!media) media = new Media({ _id: mediaId });

    const existingTitles = media.titles;
    const existingOverview = media.details?.overview;

    media.showType = mediaData.showType;
    media.imageSet = mediaData.imageSet;
    media.details = mediaData.details || {};

    media.titles = existingTitles || new Map();
    media.titles.set(languageCode, mediaData.title);

    if (mediaData.details?.overview || existingOverview) {
      media.details.overview = existingOverview || new Map();
      if (mediaData.details?.overview) {
        media.details.overview.set(languageCode, mediaData.details.overview);
      }
    }

    if (mediaData.details?.streamingOptions?.length) {
      media.details.streamingOptions = mediaData.details.streamingOptions.map(
        (incoming) => ({
          country: incoming.country,
          services: new Map(
            incoming.services.map((service) => [
              service.id,
              { mediaLink: service.mediaLink }
            ])
          )
        })
      );
    }

    await media.save();
    next();
  } catch (err) {
    next(err);
  }
};

//* ---------------------------------------
