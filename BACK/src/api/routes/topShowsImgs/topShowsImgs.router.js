import { Router } from 'express';
import { requireAdmin } from '../../../middlewares/access.js';
import {
  getAllTopShowsImgsDocs,
  getTopShowsImgsDoc
} from '../../controllers/topShowsImgs/topShowsImgs.controller.js';

const topShowsImgsRouter = Router();

topShowsImgsRouter
  .get('/', [requireAdmin], getAllTopShowsImgsDocs)
  .get('/:country', getTopShowsImgsDoc);

export default topShowsImgsRouter;
