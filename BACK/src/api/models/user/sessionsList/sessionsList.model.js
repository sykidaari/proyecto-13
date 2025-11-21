import { model } from 'mongoose';
import { buildUserChildSchema, ref } from '../../../../utils/modelUtils.js';

const SessionsListSchema = buildUserChildSchema(
  {
    SessionsList: [ref('Session')]
  },
  'sessionsLists'
);

const SessionsList = model('SessionsList', SessionsListSchema);

export default SessionsList;
