import { model, Schema } from 'mongoose';

import { buildUserChildSchema } from '../../../../utils/modelUtils.js';

const AppSettingsSchema = buildUserChildSchema(
  {
    // SETTINGS ARE MANAGED ON FRONT, SETTINGS OBJECT IS ONLY SAVED TO USE IN FRONT IF SYNCED IS TRUE. SYNCED TRUE MAKES SAME SETTINGS ON ALL DEVICES
    //ONLY NON_DEFAULT SETTINGS ARE STORED IN BACK
    syncedAcrossDevices: { type: Boolean, default: true, required: true },
    settings: {
      type: Map,
      of: Schema.Types.Mixed,
      default: () => ({})
    }
  },
  'appSettings'
);

const AppSettings = model('AppSettings', AppSettingsSchema);

export default AppSettings;
