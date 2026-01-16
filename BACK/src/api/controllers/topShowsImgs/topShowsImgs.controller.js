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

export const getTopShowsImgsDoc = async (req, res, next) => {
  const { country } = req.params;

  const usedServiceIds = [];
  const services = COUNTRIES_AND_SERVICES.find(
    (c) => c.countryCode === country
  ).services;

  try {
    const loadDoc = async (countryCode, serviceId) => {
      let doc = await TopShowsImgs.findOne({ country: countryCode, serviceId });

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
            serviceId,
            shows
          });
        } else {
          doc.shows = shows;
          await doc.save();
        }
      }

      return doc.toObject().shows;
    };

    const getTopShowsImgsForRandomService = async () => {
      const untried = services.filter((s) => !usedServiceIds.includes(s.id));

      if (untried.length === 0) {
        return await loadDoc('us', 'netflix');
      }

      const random = untried[Math.floor(Math.random() * untried.length)];

      const serviceId = random.id;

      const shows = await loadDoc(country, serviceId);

      if (shows.length < 5) {
        usedServiceIds.push(serviceId);
        return await getTopShowsImgsForRandomService();
      }

      return shows;
    };

    const shows = await getTopShowsImgsForRandomService();

    return res.status(200).json(shows);
  } catch (err) {
    next(err);
  }
};
