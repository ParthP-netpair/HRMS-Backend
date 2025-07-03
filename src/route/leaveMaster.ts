import express from 'express';
import { leaveReqCreate } from '../controller/leaveMaster';
import authMw from '../middleware/auth';
import schemaValidator from '../middleware/schemaValidator';
import { schemaValidation } from '../model/leaveMaster';
import { LEAVE_MASTER_ROUTE } from '../utils/route.enums';

const leaveMasterRoute = express.Router();

leaveMasterRoute.post(
  LEAVE_MASTER_ROUTE.create,
  authMw,
  schemaValidator(schemaValidation),
  leaveReqCreate,
);

export default leaveMasterRoute;
