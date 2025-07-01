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
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { generateOtp } from '../helpers/common';
import generateOtpTemplate from '../template/loginOtp';
import Otp from '../model/otp';
import Device from '../model/device';

export const createSingupUser = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { email, password, contactNo, gender, dob } = req.body;

    const exist = await User.findOne({
      isDeleted: false,
      $or: [{ email }, { contactNo }],
    });

    if (exist) {
      return responseWrapper(
        false,
        COMMON_MESSAGE.AlreadyExist.replace(`{param}`, 'Email or Contact Number'),
        400,
      );
    }

    // Hash password and set expiry
    const hashedPassword = await hashPassword(password);
    const passwordExpiryMonths = Number(getEnv('PASSWORD_EXPIRY_MONTHS'));
    const passwordExpireAt = moment().add(passwordExpiryMonths, 'months').toDate();

    // Create user
    await User.create({
      ...req.body,
      gender: gender,
      dob: dob,
      password: hashedPassword,
      passwordExpireAt,
    });

    return responseWrapper(true, 'employee create  Successfully', 200);
  },
);

export const sendOtpService = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { emailId } = req.body;

    const user = await User.findOne({
      email: emailId,
      isActive: false,
    }).lean();

    if (!user) {
      const msg = COMMON_MESSAGE.NotFound.replace(`{param}`, 'user');
      return responseWrapper(false, msg, 400);
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryMinutes = 1;
    const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

    const { subject, template } = generateOtpTemplate({
      otp: Number(otp),
      ExpirationTime: String(expiryMinutes),
    });

    await sendMailService({
      template,
      toMail: user.email,
      subject,
    });

    await Promise.all([
      Otp.deleteMany({ email: user.email }),
      Otp.create({
        userId: user._id,
        email: user.email,
        otp,
        expiresAt,
      }),
    ]);

    return responseWrapper(true, 'OTP sent successfully', 200);
  },
);

export const verifyYourOtp = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const data = req.body;

    const otpData = await Otp.findOne({
      userId: data.userId,
      otp: data.otp,
      isActive: true,
      isDeleted: false,
    }).lean();

    if (!otpData) {
      return responseWrapper(false, COMMON_MESSAGE.InvalidOtp, 400);
    }

    const isOtpExpired = new Date() > new Date(otpData.expiresAt);

    await Otp.findByIdAndUpdate(otpData._id, {
      $set: { isActive: false, isDeleted: true },
    });

    if (isOtpExpired) {
      return responseWrapper(false, 'OTP has expired', 400);
    }

    await User.findByIdAndUpdate(
      otpData.userId,
      { $set: { isVerified: true } },
      { upsert: true, new: true },
    );

    const user = await User.findById(otpData.userId).select('_id firstName lastName email').lean();

    const token = signJwt(user);

    return responseWrapper(true, 'OTP verified successfully', 200, token);
  },
);

export const reSendOtpService = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { email, contactNo } = req.body;

    if (!email && !contactNo) {
      return responseWrapper(false, 'Email or Contact Number is required', 400);
    }

    // Build user search query
    const query: any = { isDeleted: false };
    if (email) query.email = email;
    else query.contactNo = contactNo;

    const user = await User.findOne(query);
    if (!user) {
      return responseWrapper(false, 'User not found', 404);
    }

    let otp: string;
    let expiresAt: Date;
    let OTP_EXPIRY_MINUTES: number;

    if (email) {
      const otpData = generateOtp();
      otp = otpData.otp;
      expiresAt = otpData.expiresAt;
      OTP_EXPIRY_MINUTES = otpData.OTP_EXPIRY_MINUTES;

      // Prepare and send OTP via email
      const { subject, template } = generateOtpTemplate({
        otp: Number(otp),
        ExpirationTime: OTP_EXPIRY_MINUTES.toString(),
      });

      await sendMailService({ toMail: email, subject, template });
    } else {
      // Use static OTP for contactNo
      otp = '123456';
    }

    // Store OTP in DB
    await Otp.create({
      userId: user._id,
      email: email || null,
      contactNo: contactNo || null,
      otp,
      expiresAt,
    });

    return responseWrapper(true, 'OTP re-sent successfully', 200, {
      expiresAt, // Returning OTP expiration time
    });
  },
);

export const logOutService = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return responseWrapper(false, 'Invalid Token', 401);
    }

    const deletedDevice = await Device.findOneAndDelete({ token: token });
    if (!deletedDevice) {
      return responseWrapper(false, 'No active session found for logout.', 404);
    }
    return responseWrapper(true, COMMON_MESSAGE.Success, 200, {
      message: 'Logout Successfully!',
    });
  },
);

export const verifyYourOtpWithMobileAndEmail = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { email, mobile, otp } = req.body;

    console.log('Received data:', { email, mobile, otp });
    if (!otp || (!email && !mobile)) {
      return responseWrapper(false, 'OTP and either email or mobile are required', 400);
    }

    // Find the user by email or mobile
    const user = await User.findOne({
      ...(email ? { email } : { mobile }),
    }).lean();

    console.log('Found user:', user);
    if (!user) {
      return responseWrapper(false, 'User not found', 404);
    }

    // Find active, undeleted OTP for the user
    const otpData = await Otp.findOne({
      userId: user._id,
      otp,
      isActive: true,
      isDeleted: false,
    }).lean();

    if (!otpData) {
      return responseWrapper(false, COMMON_MESSAGE.InvalidOtp, 400);
    }

    const isOtpExpired = new Date() > new Date(otpData.expiresAt);

    // Mark OTP as used (inactive and deleted)
    await Otp.findByIdAndUpdate(otpData._id, {
      $set: { isActive: false, isDeleted: true },
    });

    if (isOtpExpired) {
      return responseWrapper(false, 'OTP has expired', 400);
    }

    // Mark user as verified
    await User.findByIdAndUpdate(user._id, { $set: { isVerified: true } }, { new: true });

    const tokenPayload = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const token = signJwt(tokenPayload);

    return responseWrapper(true, 'OTP verified successfully', 200, token);
  },
);

//--------------------------------------------------------------------------------

// export const signupService = asyncHandler(async (req, res, next) => {
//   const exist = await User.findOne({ email: req.body?.email, isDeleted: false });
//   if (exist) {
//     const msg = COMMON_MESSAGE.AlreadyExist.replace(`{param}`, 'Email');
//     return responseWrapper(false, msg, 400);
//   }
//   const hash = await hashPassword(req.body?.password);
//   req.body.password = hash;
//   const expiresInMonths = Number(getEnv('PASSWORD_EXPIRY_MONTHS'));
//   req.body.passwordExpireAt = moment().add(expiresInMonths, 'months').toDate();
//   const user = await User.create(req.body);
//   return responseWrapper(true, COMMON_MESSAGE.Success, 201, user);
// });

export const loginService = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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

    const { password, ...rest } = user.toJSON();

    const token = signJwt(rest, data?.rememberMe);
    await Device.create({
      userId: user._id,
      role: user?.role,
      token: token,
    });

    user.lastLoginAt = new Date();
    await user.save();
    return responseWrapper(true, COMMON_MESSAGE.Success, 200, { token, role: rest?.role });
  },
);

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
