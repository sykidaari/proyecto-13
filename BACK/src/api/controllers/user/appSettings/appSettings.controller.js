import { findOrCreateByUser } from '../../../../utils/controllerUtils.js';
import AppSettings from '../../../models/user/appSettings/appsettings.model.js';

//* GET
export const getAppSettings = async (req, res, next) => {
  const { _id: id } = req.user;

  try {
    const { doc: appSettings, status } = await findOrCreateByUser(
      AppSettings,
      id,
      {
        lean: true
      }
    );

    return res.status(status).json(appSettings);
  } catch (err) {
    next(err);
  }
};

//* PATCH
export const editAppSettings = async (req, res, next) => {
  const {
    user: { _id: id },
    body: { reset, ...updates }
  } = req;

  const allowedTopLevelFields = ['reset', 'syncedAcrossDevices', 'settings'];
  for (const key of Object.keys(req.body)) {
    if (!allowedTopLevelFields.includes(key)) {
      return next(customError(400, `Invalid field: ${key}`));
    }
  }

  const { syncedAcrossDevices, ...settings } = updates;

  try {
    const { doc: appSettings } = await findOrCreateByUser(AppSettings, id);

    if (syncedAcrossDevices === false || reset) {
      if (reset) appSettings.syncedAcrossDevices = true;

      appSettings.settings = {};

      await appSettings.save();
      const settingsObject = appSettings.toObject();
      return res.status(200).json(settingsObject);
    }

    if (syncedAcrossDevices !== undefined) {
      appSettings.syncedAcrossDevices = syncedAcrossDevices;
    }

    appSettings.settings = settings;

    await appSettings.save();
    const settingsObject = appSettings.toObject();

    return res.status(200).json(settingsObject);
  } catch (err) {
    next(err);
  }
};
