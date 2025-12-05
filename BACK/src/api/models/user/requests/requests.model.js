import { model } from 'mongoose';
import {
  buildUserChildSchema,
  isNewItem,
  requiredString,
  userRefRequired
} from '../../../../utils/modelUtils.js';
import { sessionParameters } from '../../session/session.model.js';

const sentRequest = { user: userRefRequired };
const receivedRequest = {
  user: userRefRequired,
  isNewItem
};

const RequestsSchema = buildUserChildSchema(
  {
    friends: {
      sent: [sentRequest],
      received: [receivedRequest]
    },
    sessions: {
      sent: [
        {
          ...sentRequest,
          sessionParameters,
          requestGroupId: requiredString,

          // since session reqs aren't unique in any way, they can accumulate, that's why there's ttl
          createdAt: { type: Date, default: Date.now, expires: '3d' }
        }
      ],
      received: [
        {
          ...receivedRequest,
          sessionParameters,
          requestGroupId: requiredString,

          // since session reqs aren't unique in any way, they can accumulate, that's why there's ttl
          createdAt: { type: Date, default: Date.now, expires: '3d' }
        }
      ]
    }
  },
  { timestamps: true, collection: 'requests' }
);

const Requests = model('Requests', RequestsSchema, 'requests');
//! DO NOT REMOVE THE COLLECTION NAME HERE!!! IT CAUSES AN ERROR IN MONGODB
// Error occurs only in this model, adding the collection name in the model definition fixes it

export default Requests;
