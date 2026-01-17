import COUNTRIES_AND_SERVICES from '../../../constants/domain/countriesAndServices.js';
import streamingAvailabilityService from '../../../services/external/streamingAvailability.service.js';
import { oneWeekAgo } from '../../../utils/controllerUtils.js';
import TopShowsImgs from '../../models/topShowsImgs/topShowsImgs.model.js';

//* GET

//? ADMIN ONLY
export const getAllTopShowsImgsDocs = async (req, res, next) => {
  try {
    const topShowsImgsDocs = await TopShowsImgs.find().lean();

    return res.status(200).json(topShowsImgsDocs);
  } catch (err) {
    next(err);
  }
};

// Public

// HELPERS
const TOP_SHOWS_SERVICES = ['netflix', 'prime', 'apple', 'hbo', 'disney'];
const loadDoc = async (countryCode, serviceId) => {
  let doc = await TopShowsImgs.findOne({
    country: countryCode,
    service: serviceId
  });

  const noDoc = !doc;
  const oldDoc = doc && doc.updatedAt < oneWeekAgo();

  if (noDoc || oldDoc) {
    const shows = await streamingAvailabilityService.getTopShowsImgs(
      countryCode,
      serviceId
    );

    if (noDoc) {
      doc = await TopShowsImgs.create({
        country: countryCode,
        service: serviceId,
        shows
      });
    } else {
      doc.shows = shows;
      await doc.save();
    }
  }

  return doc.toObject().shows;
};

export const getTopShowsImgsDoc = async (req, res, next) => {
  const { country } = req.params;

  const usedServiceIds = [];
  const services = COUNTRIES_AND_SERVICES.find(
    (c) => c.countryCode === country
  ).services.filter((s) => TOP_SHOWS_SERVICES.includes(s.id));

  try {
    let shows = null;

    while (true) {
      const untried = services.filter((s) => !usedServiceIds.includes(s.id));

      if (untried.length === 0) {
        shows = await loadDoc('us', 'netflix');
        break;
      }

      const random = untried[Math.floor(Math.random() * untried.length)];
      const serviceId = random.id;

      shows = await loadDoc(country, serviceId);

      if (shows.length >= 5) break;

      usedServiceIds.push(serviceId);
    }

    return res.status(200).json(shows);
  } catch (err) {
    next(err);
  }
};
