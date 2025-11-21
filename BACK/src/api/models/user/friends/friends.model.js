import { model } from 'mongoose';
import { buildUserChildSchema, userRef } from '../../../../utils/modelUtils.js';

const FriendsSchema = buildUserChildSchema(
  {
    friends: [userRef]
  },
  'friends'
);

const Friends = model('Friends', FriendsSchema);

export default Friends;
