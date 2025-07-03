import express from 'express';
import {
  departmentDDL,
  designationDDL,
  leaveMangementDDL,
  leaveTypeDDL,
  roleDDL,
} from '../controller/dropDown';
import { DROPDOWN_LIST } from '../utils/route.enums';
import authMw from '../middleware/auth';

const dropDownRoute = express.Router();

dropDownRoute.get(DROPDOWN_LIST.department, authMw, departmentDDL);
dropDownRoute.get(DROPDOWN_LIST.role, authMw, roleDDL);
dropDownRoute.get(DROPDOWN_LIST.leaveType, authMw, leaveTypeDDL);
dropDownRoute.get(DROPDOWN_LIST.designation, authMw, designationDDL);
dropDownRoute.get(DROPDOWN_LIST.leaveManagement, authMw, leaveMangementDDL);

export default dropDownRoute;
