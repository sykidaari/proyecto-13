import { Router } from 'express';
import { getRelationshipToUser } from '../../controllers/user/people/people.controller.js';

const peopleRouter = Router();

peopleRouter.get('/:otherUserId/relationship', getRelationshipToUser);

export default peopleRouter;
