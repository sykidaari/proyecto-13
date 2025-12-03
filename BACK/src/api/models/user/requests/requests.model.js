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
          requestGroupId: requiredString
        }
      ],
      received: [
        {
          ...receivedRequest,
          sessionParameters,
          requestGroupId: requiredString
        }
      ]
    }
  },
  { timestamps: true, collection: 'requests' }
);

const Requests = model('Requests', RequestsSchema);

export default Requests;
