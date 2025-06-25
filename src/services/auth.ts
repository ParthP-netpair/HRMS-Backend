import moment from 'moment';
import getEnv from '../config/env.config';
import { comparePassword, hashPassword, signJwt } from '../helpers/jwt-bcrypt';
import responseWrapper from '../helpers/responseWrapper';
import asyncHandler from '../middleware/asyncHandler';
import User from '../model/user';
import { COMMON_MESSAGE } from '../utils/messages.enum';
import { generateRandomToken } from '../helpers/encrypt';
import sendMailService from '../config/mail.config';
import resetPassword from '../template/resetPassword';

export const signupService = asyncHandler(async (req, res, next) => {
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

export const loginService = asyncHandler(async (req, res, next) => {
  const data = req.body;
  const user = await User.findOne({ email: data?.email, isActive: true, isDeleted: false });
  if (!user) {
    const msg = COMMON_MESSAGE.NotFound.replace(`{param}`, 'User');
    return responseWrapper(false, msg, 400);
  }

  const passwordMatch = await comparePassword(data?.password, user?.password);
  if (!passwordMatch) {
    const msg = COMMON_MESSAGE.InvalidPassword;
    return responseWrapper(false, msg, 400);
  }

  // const passwordExpireAt = moment(user?.passwordExpireAt);
  // const isPassExpired = moment().isAfter(passwordExpireAt);
  // if (isPassExpired) {
  //   const expiryMinutes = Number(getEnv('RESET_PASSWORD_EXPIRY_MINUTES'));
  //   const resetPasswordToken = generateRandomToken();
  //   if (!resetPasswordToken) return responseWrapper(false, COMMON_MESSAGE.Error, 400);
  //   user.resetPasswordExpireAt = moment().add(expiryMinutes, 'minutes').toDate();
  //   user.resetPasswordToken = resetPasswordToken;
  //   await user.save();
  //   const url = getEnv('FRONTEND_URL') + '/reset-password?token=' + resetPasswordToken;
  //   return responseWrapper(false, COMMON_MESSAGE.PasswordExpired, 400, {
  //     url,
  //     passwordExpired: true,
  //   });
  // };

  const { password, ...rest } = user.toJSON();
  const token = signJwt(rest, data?.rememberMe);
  user.lastLoginAt = new Date();
  await user.save();
  return responseWrapper(true, COMMON_MESSAGE.Success, 200, { token, role: rest?.role });
});

export const currentUserService = asyncHandler(async (req, res, next) => {
  const decodedToken = req.token?.user;
  const user = (await User.findById(decodedToken?._id))?.toJSON();
  return responseWrapper(true, COMMON_MESSAGE.Success, 200, { user });
});

export const forgotPasswordService = asyncHandler(async (req, res, next) => {
  const data = req.body;
  const user = await User.findOne({ email: data?.email, isActive: true, isDeleted: false });

  if (!user) {
    const msg = COMMON_MESSAGE.NotFound.replace(`{param}`, 'User');
    return responseWrapper(false, msg, 400);
  }
  const resetPasswordToken = generateRandomToken();
  if (!resetPasswordToken) return responseWrapper(false, COMMON_MESSAGE.Error, 400);
  const url = `${getEnv('FRONTEND_URL')}/reset-password?token=${resetPasswordToken}`;
  const expiryMinutes = Number(getEnv('RESET_PASSWORD_EXPIRY_MINUTES'));
  const { subject, template } = resetPassword({
    Name: user.firstName + ' ' + user.lastName,
    ExpirationTime: String(expiryMinutes),
    ResetLink: url,
  });
  await sendMailService({
    template,
    toMail: user.email,
    subject,
  });
  user.resetPasswordExpireAt = moment().add(expiryMinutes, 'minutes').toDate();
  user.resetPasswordToken = resetPasswordToken;
  await user.save();
  return responseWrapper(true, COMMON_MESSAGE.Success, 200, { url });
});

export const changePasswordService = asyncHandler(async (req, res, next) => {
  const data = req.body;
  const user = await User.findOne({ resetPasswordToken: data?.token });
  if (!user) return responseWrapper(false, COMMON_MESSAGE.InvalidToken, 400);

  const resetPasswordExpireAt = moment(user?.resetPasswordExpireAt);
  const isExpired = moment().isAfter(resetPasswordExpireAt);
  if (isExpired) return responseWrapper(false, COMMON_MESSAGE.TokenExpired, 400);

  user.password = await hashPassword(data?.password);
  const expiresInMonths = Number(getEnv('PASSWORD_EXPIRY_MONTHS'));
  user.passwordExpireAt = moment().add(expiresInMonths, 'months').toDate();
  user.resetPasswordExpireAt = null;
  user.resetPasswordToken = null;
  await user.save();
  return responseWrapper(true, COMMON_MESSAGE.Success, 200);
});
