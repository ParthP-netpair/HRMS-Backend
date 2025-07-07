import express from 'express';
import {
  leaveReqCreate,
  leaveReqDelete,
  leaveReqGetOne,
  leaveReqUpdate,
} from '../controller/leaveMaster';
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
leaveMasterRoute.post(LEAVE_MASTER_ROUTE.update, authMw, leaveReqUpdate);
leaveMasterRoute.post(LEAVE_MASTER_ROUTE.getone, authMw, leaveReqGetOne);
leaveMasterRoute.post(LEAVE_MASTER_ROUTE.delete, authMw, leaveReqDelete);

export default leaveMasterRoute;
