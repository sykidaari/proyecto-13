import { model } from 'mongoose';
import {
  buildUserChildSchema,
  requiredString
} from '../../../utils/modelUtils.js';

const userAccessSessionSchema = buildUserChildSchema(
  {
    tokenHash: requiredString,
    expiresAt: { type: Date, required: true },
    persistent: { type: Boolean, required: true }
  },
  'userAccessSessions'
);

userAccessSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const UserAccessSession = model('UserAccessSession', userAccessSessionSchema);

export default UserAccessSession;
