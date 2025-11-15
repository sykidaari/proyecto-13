import { model } from 'mongoose';
import { buildSchema } from '../../../../utils/modelUtils';
import { userRef, userRef_unrequired } from '../../../../utils/modelUtils';

const FriendsSchema = buildSchema(
  {
    user: userRef,

    friends: [userRef_unrequired]
  },
  'friends'
);

const Friends = model('Friends', FriendsSchema, 'friends');
