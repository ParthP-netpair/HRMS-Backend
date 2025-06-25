import { createUserService } from '../services/user';

export const createUser = async (req, res, next) => {
  const result = await createUserService(req, res, next);
  return res.json(result);
};
