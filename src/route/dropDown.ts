import express from 'express';
import { departmentDDL, roleDDL } from '../controller/dropDown';
import { DROPDOWN_LIST } from '../utils/route.enums';
import authMw from '../middleware/auth';

const dropDownRoute = express.Router();

dropDownRoute.get(DROPDOWN_LIST.department, authMw, departmentDDL);
dropDownRoute.get(DROPDOWN_LIST.role, authMw, roleDDL);

export default dropDownRoute;
