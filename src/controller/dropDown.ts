import {
  departmentList,
  leaveTypeList,
  roleList,
  designationList,
  leaveManagementList,
} from '../services/dropDown';

export const departmentDDL = async (req, res, next) => {
  const result = await departmentList(req, res, next);
  return res.json(result);
};

export const roleDDL = async (req, res, next) => {
  const result = await roleList(req, res, next);
  return res.json(result);
};
export const leaveTypeDDL = async (req, res, next) => {
  const result = await leaveTypeList(req, res, next);
  return res.json(result);
};
export const designationDDL = async (req, res, next) => {
  const result = await designationList(req, res, next);
  return res.json(result);
};

export const leaveMangementDDL = async (req, res, next) => {
  const result = await leaveManagementList(req, res, next);
  return res.json(result);
};
