import { createUserService, getOneUser, updateUserService, UserList } from '../services/user';

export const createUser = async (req, res, next) => {
  const result = await createUserService(req, res, next);
  return res.json(result);
};
export const listAllUser = async (req, res, next) => {
  const result = await UserList(req, res, next);
  return res.json(result);
};
export const getUserOne = async (req, res, next) => {
  const result = await getOneUser(req, res, next);
  return res.json(result);
};
export const updateUserOne = async (req, res, next) => {
  const result = await updateUserService(req, res, next);
  return res.json(result);
};
