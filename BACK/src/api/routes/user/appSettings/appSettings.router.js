import { Router } from 'express';
import {
  editAppSettings,
  getAppSettings
} from '../../../controllers/user/appSettings/appSettings.controller.js';
import { requireOwner } from '../../../../middlewares/access.js';
import { requireReqBody } from '../../../../middlewares/middlewares.js';

const appSettingsRouter = Router();

appSettingsRouter.get('/', getAppSettings);
// BODY IS VALIDATED IN CONTROLLER BECAUSE IT'S DYNAMIC
appSettingsRouter.patch('/', [requireOwner, requireReqBody], editAppSettings);

export default appSettingsRouter;
