import { model } from 'mongoose';
import { userRef } from '../../../../utils/modelUtils';
import { buildSchema } from '../../../../utils/modelUtils';

const AppSettingsSchema = buildSchema(
  {
    user: userRef,
    // SETTINGS ARE MANAGED ON FRONT, SETTINGS OBJECT IS ONLY SAVED TO USE IN FRONT IF SYNCED IS TRUE. SYNCED TRUE MAKES SAME SETTINGS ON ALL DEVICES
    syncedAcrossDevices: { type: Boolean, default: true, required: true },
    settings: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: () => ({})
    }
  },
  'appSettings'
);

const AppSettings = model('AppSettings', AppSettingsSchema, 'appsettings');

export default AppSettings;
