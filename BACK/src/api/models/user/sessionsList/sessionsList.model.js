import { model } from 'mongoose';
import {
  buildUserChildSchema,
  isNewItem,
  ref
} from '../../../../utils/modelUtils.js';

const SessionsListSchema = buildUserChildSchema(
  {
    SessionsList: [{ session: ref('Session'), isNewItem }]
  },
  'sessionsLists'
);

const SessionsList = model('SessionsList', SessionsListSchema);

export default SessionsList;
