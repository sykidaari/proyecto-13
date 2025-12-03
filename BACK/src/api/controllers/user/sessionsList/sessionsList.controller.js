import { getUserChild } from '../userChildren.controller.js';

//* GET

export const getSessionsList = getUserChild({ populateFields: 'sessionsList' });

// NEED TO MAKE SESSIONS SYSTEM
