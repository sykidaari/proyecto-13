import { Router } from 'express';
import { getRequests } from '../../../controllers/requests/requests.controller.js';

const requestsRouter = Router();

requestsRouter.get('/', getRequests);

export default requestsRouter;
