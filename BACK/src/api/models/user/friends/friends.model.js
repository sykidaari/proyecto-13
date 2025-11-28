import { model } from 'mongoose';
import {
  buildUserChildSchema,
  isNewItem,
  userRef
} from '../../../../utils/modelUtils.js';

const FriendsSchema = buildUserChildSchema(
  {
    friendsList: [{ user: userRef, isNewItem }]
  },
  'friends'
);

const Friends = model('Friends', FriendsSchema);

export default Friends;
