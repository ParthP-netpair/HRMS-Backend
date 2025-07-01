import { departmentList, roleList } from '../services/dropDown';

export const departmentDDL = async (req, res, next) => {
  const result = await departmentList(req, res, next);
  return res.json(result);
};

export const roleDDL = async (req, res, next) => {
  const result = await roleList(req, res, next);
  return res.json(result);
};
