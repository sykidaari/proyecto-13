import { Router } from 'express';
import { validateBody } from '../../../../middlewares/middlewares';

const favoritesRouter = Router();

favoritesRouter.get();

favoritesRouter.patch('/genre', [validateBody(['genre'])]);
favoritesRouter.patch('/media', [validateBody(['media'])]);
