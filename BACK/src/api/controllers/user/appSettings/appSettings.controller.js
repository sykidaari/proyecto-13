import ERR from '../../../../constants/domain/errorCodes.js';
import { getUserChild } from '../userChildren.controller.js';

//*
export const getAppSettings = getUserChild();

//* PATCH
export const editAppSettings = async (req, res, next) => {
  console.log('PATCH BODY:', req.body);
  const {
    doc: appSettings,
    status,
    body: { reset, settings, syncedAcrossDevices }
  } = req;

  const allowed = ['reset', 'syncedAcrossDevices', 'settings'];

  for (const key of Object.keys(req.body)) {
    if (!allowed.includes(key))
      throw customError(400, ERR.body.invalidField, { field: key });
  }

  try {
    if (reset || syncedAcrossDevices === false) {
      if (reset) appSettings.syncedAcrossDevices = true;

      appSettings.settings = {};

      await appSettings.save();

      return res.status(status).json(appSettings.toObject());
    }

    if (syncedAcrossDevices !== undefined) {
      appSettings.syncedAcrossDevices = syncedAcrossDevices;
    }

    if (settings !== undefined) {
      for (const [key, value] of Object.entries(settings)) {
        appSettings.settings.set(key, value);
      }
    }

    await appSettings.save();

    return res.status(status).json(appSettings.toObject());
  } catch (err) {
    next(err);
  }
};
