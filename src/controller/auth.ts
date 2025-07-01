import {
  currentUserService,
  createSingupUser,
  loginService,
  changePasswordService,
  forgotPasswordService,
} from '../services/auth';

export const signupCtl = async (req, res, next) => {
  const result = await createSingupUser(req, res, next);
  return res.json(result);
};
export const loginCtl = async (req, res, next) => {
  const result = await loginService(req, res, next);
  return res.json(result);
};
export const changePasswordCtl = async (req, res, next) => {
  const result = await changePasswordService(req, res, next);
  return res.json(result);
};
export const currentUserCtl = async (req, res, next) => {
  const result = await currentUserService(req, res, next);
  return res.json(result);
};
export const forgotPasswordCtl = async (req, res, next) => {
  const result = await forgotPasswordService(req, res, next);
  return res.json(result);
};
