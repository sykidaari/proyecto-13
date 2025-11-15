import { model } from 'mongoose';
import { buildSchema } from '../../../../utils/modelUtils';
import { userRef, userRef_unrequired } from '../../../../utils/modelUtils';

const RequestsSchema = buildSchema(
  {
    user: userRef,

    friends: {
      sent: [userRef_unrequired],
      received: [userRef_unrequired]
    },
    sessions: {
      sent: [userRef_unrequired],
      received: [userRef_unrequired]
    }
  },
  { timestamps: true, collection: 'requests' }
);

const Requests = model('Requests', RequestsSchema, 'requests');

export default Requests;
