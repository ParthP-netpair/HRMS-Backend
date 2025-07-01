import express from 'express';
import {
  createDesignation,
  ListDesignation,
  changeDesignation,
  designationOne,
} from '../controller/designation';
import schemaValidator from '../middleware/schemaValidator';
import { schemaValidation } from '../model/designation';
import { DESIGNATION_ROUTE } from '../utils/route.enums';
import authMw from '../middleware/auth';

const designationRoute = express.Router();

designationRoute.post(
  DESIGNATION_ROUTE.create,
  authMw,
  schemaValidator(schemaValidation),
  createDesignation,
);
designationRoute.post(DESIGNATION_ROUTE.list, authMw, ListDesignation);
designationRoute.post(DESIGNATION_ROUTE.getone, authMw, designationOne);
designationRoute.post(DESIGNATION_ROUTE.update, authMw, changeDesignation);

export default designationRoute;
