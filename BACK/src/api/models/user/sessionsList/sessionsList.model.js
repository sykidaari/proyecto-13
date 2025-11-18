import { model } from 'mongoose';
import { buildSchema, userRefRequired } from '../../../../utils/modelUtils';

const SessionsListSchema = buildSchema(
  {
    user: userRefRequired,

    SessionsList: [ref('Session')]
  },
  'sessionsLists'
);

const SessionsList = model('SessionsList', SessionsListSchema, 'sessionsLists');

export default SessionsList;
