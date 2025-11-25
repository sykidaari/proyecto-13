import Requests from '../../models/user/requests/requests.model.js';
import { getUserChild } from '../userChildren.controller.js';

//* GET
export const getRequests = getUserChild;

//? The rest of Requests logic is in src/services/requests.service.js and controllers of models that use requests:
//? - Friends
//? - Sessions
