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
  const { country, service } = req.params;

  try {
    let topShowsImgsDoc = await TopShowsImgs.findOne({
      country,
      service
    });

    const noDoc = !topShowsImgsDoc;
    const oldDoc = topShowsImgsDoc && topShowsImgsDoc.updatedAt < oneWeekAgo();

    if (noDoc || oldDoc) {
      const docData = await streamingAvailabilityService.getTopShowsImgs(
        country,
        service
      );

      if (noDoc)
        topShowsImgsDoc = await TopShowsImgs.create({
          country,
          service,
          shows: docData
        });
      else if (oldDoc) {
        topShowsImgsDoc.shows = docData;
        await topShowsImgsDoc.save();
      }
    }

    return res.status(200).json(topShowsImgsDoc.toObject());
  } catch (err) {
    next(err);
  }
};
