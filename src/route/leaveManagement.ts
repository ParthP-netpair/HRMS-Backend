import express from 'express';
import {
  leaveMangementCreate,
  leaveMangementDelete,
  leaveMangementGetOne,
  leaveMangementUpdate,
} from '../controller/leaveMangement';
import authMw from '../middleware/auth';
import schemaValidator from '../middleware/schemaValidator';
import { schemaValidation } from '../model/leaveManagement';
import { LEAVE_MANGEMENT_ROUTE } from '../utils/route.enums';

const leaveMangementRoute = express.Router();

leaveMangementRoute.post(
  LEAVE_MANGEMENT_ROUTE.create,
  authMw,
  schemaValidator(schemaValidation),
  leaveMangementCreate,
);
leaveMangementRoute.post(LEAVE_MANGEMENT_ROUTE.update, authMw, leaveMangementUpdate);
leaveMangementRoute.post(LEAVE_MANGEMENT_ROUTE.getone, authMw, leaveMangementGetOne);
leaveMangementRoute.post(LEAVE_MANGEMENT_ROUTE.delete, authMw, leaveMangementDelete);

export default leaveMangementRoute;
