import { model } from 'mongoose';
import {
  buildUserChildSchema,
  isNewItem,
  userRefRequired
} from '../../../../utils/modelUtils.js';

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
      sent: [sentRequest],
      received: [receivedRequest]
    }
  },
  { timestamps: true, collection: 'requests' }
);

const Requests = model('Requests', RequestsSchema);

export default Requests;
