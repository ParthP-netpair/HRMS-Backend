import moment from 'moment';
import getEnv from '../config/env.config';
import { hashPassword } from '../helpers/jwt-bcrypt';
import responseWrapper from '../helpers/responseWrapper';
import asyncHandler from '../middleware/asyncHandler';
import User from '../model/user';
import { COMMON_MESSAGE } from '../utils/messages.enum';

export const createUserService = asyncHandler(async (req, res, next) => {
  const exist = await User.findOne({ email: req.body?.email, isDeleted: false });
  if (exist) {
    const msg = COMMON_MESSAGE.AlreadyExist.replace(`{param}`, 'Email');
    return responseWrapper(false, msg, 400);
  }
  const hash = await hashPassword(req.body?.password);
  req.body.password = hash;
  const expiresInMonths = Number(getEnv('PASSWORD_EXPIRY_MONTHS'));
  req.body.passwordExpireAt = moment().add(expiresInMonths, 'months').toDate();
  const user = await User.create(req.body);
  return responseWrapper(true, COMMON_MESSAGE.Success, 201, user);
});
