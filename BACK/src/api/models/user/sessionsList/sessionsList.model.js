import { model } from 'mongoose';
import { buildSchema } from '../../../../utils/modelUtils';
import { userRef } from '../../../../utils/modelUtils';

const SessionsListSchema = buildSchema(
  {
    user: userRef,

    SessionsList: [ref('Session')]
  },
  'sessionsLists'
);

const SessionsList = model('SessionsList', SessionsListSchema, 'sessionsLists');

export default SessionsList;
