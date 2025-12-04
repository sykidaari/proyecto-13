import { Router } from 'express';
import {
  editAppSettings,
  getAppSettings
} from '../../../controllers/user/appSettings/appSettings.controller.js';
import { requireSelf } from '../../../../middlewares/access.js';
import { requireReqBody } from '../../../../middlewares/middlewares.js';

const appSettingsRouter = Router();

appSettingsRouter.get('/', getAppSettings);
// BODY IS VALIDATED IN CONTROLLER BECAUSE IT'S DYNAMIC
appSettingsRouter.patch('/', [requireSelf, requireReqBody], editAppSettings);

export default appSettingsRouter;
