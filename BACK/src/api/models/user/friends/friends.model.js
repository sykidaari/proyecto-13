import { model } from 'mongoose';
import {
  buildSchema,
  userRef,
  userRefRequired
} from '../../../../utils/modelUtils';

const FriendsSchema = buildSchema(
  {
    user: userRefRequired,

    friends: [userRef]
  },
  'friends'
);

const Friends = model('Friends', FriendsSchema, 'friends');
