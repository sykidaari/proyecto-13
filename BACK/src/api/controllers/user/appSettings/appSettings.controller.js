import ERR from '../../../../constants/errorCodes.js';
import { getUserChild } from '../userChildren.controller.js';

//*
export const getAppSettings = getUserChild;

//* PATCH
export const editAppSettings = async (req, res, next) => {
  const {
    doc: appSettings,
    status,
    body: { reset, ...updates }
  } = req;

  const allowed = ['reset', 'syncedAcrossDevices', 'settings'];
  for (const key of Object.keys(req.body)) {
    if (!allowed.includes(key))
      throw customError(400, ERR.body.invalidField, { field: key });
  }

  const { syncedAcrossDevices, ...settings } = updates;

  try {
    if (reset || syncedAcrossDevices === false) {
      if (reset) appSettings.syncedAcrossDevices = true;

      appSettings.settings = {};

      await appSettings.save();
      const settingsObject = appSettings.toObject();
      return res.status(status).json(settingsObject);
    }

    if (syncedAcrossDevices !== undefined) {
      appSettings.syncedAcrossDevices = syncedAcrossDevices;
    }

    appSettings.settings = settings;

    await appSettings.save();
    const settingsObject = appSettings.toObject();

    return res.status(status).json(settingsObject);
  } catch (err) {
    next(err);
  }
};
