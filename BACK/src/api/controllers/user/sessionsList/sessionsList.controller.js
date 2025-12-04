import { getUserChild, markItemAsSeen } from '../userChildren.controller.js';

//* GET

export const getSessionsList = getUserChild({ populateFields: 'sessionsList' });

export const markSessionInListAsSeen = markItemAsSeen(
  'sessionsList',
  'session'
);
