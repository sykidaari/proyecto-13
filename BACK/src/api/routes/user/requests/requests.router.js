import { Router } from 'express';
import { getRequests } from '../../../controllers/requests/requests.controller.js';

const requestsRouter = Router();

requestsRouter.get('/', getRequests);

export default requestsRouter;

//? The rest of Requests logic is in src/services/requests.service.js and controllers of models that use requests:
//? - Friends
//? - Sessions
