import moment from 'moment';
import getEnv from '../config/env.config';
import { hashPassword } from '../helpers/jwt-bcrypt';
import responseWrapper from '../helpers/responseWrapper';
import asyncHandler from '../middleware/asyncHandler';
import User from '../model/user';
import { COMMON_MESSAGE } from '../utils/messages.enum';
import { AuthenticatedRequest } from '../middleware/auth';
import { NextFunction, Response } from 'express';
import Role from '../model/role';

export const createUserService = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const {
      email,
      password,
      contactNo,
      gender,
      dob,
      roleId,
      designationId,
      firstName,
      lastName,
      profilePhoto,
      legalId,
      panNumber,
      bankAccountNumber,
      ifscCode,
      uanNumber,
      ctc,
      netSalary,
      aadharNumber,
      resumeUrl,
      offerLetterUrl,
      certificateUrl,
      photoUrl,
      reportingId,
    } = req.body;

    // ✅ Check if user already exists
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

    // ✅ Hash password and set expiry
    const hashedPassword = await hashPassword(password);
    const passwordExpiryMonths = Number(getEnv('PASSWORD_EXPIRY_MONTHS'));
    const passwordExpireAt = moment().add(passwordExpiryMonths, 'months').toDate();

    const roleData = await Role.findById(roleId);
    if (!roleData) {
      return responseWrapper(false, 'Invalid roleId', 400);
    }

    // ✅ Create user with full data
    await User.create({
      email,
      password: hashedPassword,
      contactNo,
      gender,
      dob,
      roleId,
      designationId,
      firstName,
      lastName,
      profilePhoto,
      legalId,
      panNumber,
      bankAccountNumber,
      ifscCode,
      uanNumber,
      ctc,
      netSalary,
      aadharNumber,
      resumeUrl,
      offerLetterUrl,
      certificateUrl,
      photoUrl,
      role: roleData.key,
      passwordExpireAt,
      reportingId,
    });
    return responseWrapper(true, COMMON_MESSAGE.Success, 201, 'Employee Created Successfully');
  },
);

export const UserList = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = await User.find({
      role: { $ne: 'Super_Admin' },
      isActive: true,
      isDeleted: false,
    }).select('-password -passwordExpireAt');
    return responseWrapper(true, COMMON_MESSAGE.Success, 200, user);
  },
);
export const getOneUser = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { _id } = req.body;
    if (!_id) {
      return responseWrapper(false, '_id is required!', 404);
    }
    const UserData = await User.findOne({ _id, isActive: true, isDeleted: false }).select(
      '-password -passwordExpireAt',
    );
    return responseWrapper(true, COMMON_MESSAGE.Success, 200, UserData);
  },
);

export const updateUserService = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const {
      _id,
      firstName,
      lastName,
      contactNo,
      gender,
      dob,
      roleId,
      designationId,
      profilePhoto,
      legalId,
      panNumber,
      bankAccountNumber,
      ifscCode,
      uanNumber,
      ctc,
      netSalary,
      aadharNumber,
      resumeUrl,
      offerLetterUrl,
      certificateUrl,
      photoUrl,
    } = req.body;

    if (!_id) {
      return responseWrapper(false, 'Designation ID (_id) is required', 400, null);
    }

    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        firstName,
        lastName,
        contactNo,
        gender,
        dob,
        roleId,
        designationId,
        profilePhoto,
        legalId,
        panNumber,
        bankAccountNumber,
        ifscCode,
        uanNumber,
        ctc,
        netSalary,
        aadharNumber,
        resumeUrl,
        offerLetterUrl,
        certificateUrl,
        photoUrl,
      },
      { new: true }, // return updated document
    );

    const { password, ...safeUser } = updateUser.toObject();
    return responseWrapper(true, 'User updated successfully', 200, safeUser);
  },
);
