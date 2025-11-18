import { model } from 'mongoose';
import {
  buildSchema,
  userRef,
  userRefRequired
} from '../../../../utils/modelUtils';

const RequestsSchema = buildSchema(
  {
    user: userRefRequired,

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

const Requests = model('Requests', RequestsSchema, 'requests');

export default Requests;
