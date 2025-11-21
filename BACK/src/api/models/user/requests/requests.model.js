import { model } from 'mongoose';
import { buildUserChildSchema, userRef } from '../../../../utils/modelUtils.js';

const RequestsSchema = buildUserChildSchema(
  {
    friends: {
      sent: [userRef],
      received: [userRef]
    },
    sessions: {
      sent: [userRef],
      received: [userRef]
    }
  },
  { timestamps: true, collection: 'requests' }
);

const Requests = model('Requests', RequestsSchema);

export default Requests;
