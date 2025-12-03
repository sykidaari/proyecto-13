import { model } from 'mongoose';
import {
  buildUserChildSchema,
  isNewItem,
  sessionRef
} from '../../../../utils/modelUtils.js';

const SessionsListSchema = buildUserChildSchema(
  {
    sessionsList: [{ session: sessionRef, isNewItem }]
  },
  'sessionsLists'
);

const SessionsList = model('SessionsList', SessionsListSchema);

export default SessionsList;
