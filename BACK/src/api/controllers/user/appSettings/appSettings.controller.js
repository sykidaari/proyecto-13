import AppSettings from '../../../models/user/appSettings/appsettings.model';

//* GET
export const getAppSettings = async (req, res, next) => {
  const { _id: id } = req.user;

  try {
    let settings = await AppSettings.findOne({
      user: id
    }).lean();

    if (!settings) settings = await AppSettings.create({ user: id });
  } catch (err) {
    next(err);
  }
};

export const editAppSettings = async () => {
  const {
    user: { _id: id },
    body: { reset, ...updates }
  } = req;

  const { syncedAcrossDevices, ...settings } = updates;

  try {
    let appSettings = await AppSettings.findOne({
      user: id
    });

    if (!appSettings)
      appSettings = await AppSettings.create({
        user: id
      });

    if (syncedAcrossDevices === false || reset) {
      if (reset) appSettings.syncedAcrossDevices = true;

      appSettings.settings = {};
      await appSettings.save();
      return res.status(200).json(appSettings);
    }

    Object.assign(appSettings, settings);
    await appSettings.save();
    const settingsObject = appSettings.toObject();

    return res.status(200).json(settingsObject);
  } catch (err) {
    next(err);
  }
};
