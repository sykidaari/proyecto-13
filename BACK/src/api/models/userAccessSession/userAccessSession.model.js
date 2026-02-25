import { model } from 'mongoose';
import {
  buildSchema,
  requiredString,
  userRefRequired
} from '../../../utils/modelUtils.js';

const userAccessSessionSchema = buildSchema(
  {
    user: userRefRequired,

    tokenHash: requiredString,
    expiresAt: { type: Date, required: true },
    persistent: { type: Boolean, required: true },

    previousTokenHash: {
      type: String,
      default: null
    },
    previousValidUntil: {
      type: Date,
      default: null
    }
  },
  'userAccessSessions'
);

userAccessSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const UserAccessSession = model('UserAccessSession', userAccessSessionSchema);

export default UserAccessSession;
