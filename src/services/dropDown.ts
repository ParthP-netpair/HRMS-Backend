import { NextFunction, Response } from 'express';
import responseWrapper from '../helpers/responseWrapper';
import asyncHandler from '../middleware/asyncHandler';
import { AuthenticatedRequest } from '../middleware/auth';
import Department from '../model/department';
import { COMMON_MESSAGE } from '../utils/messages.enum';
import Role from '../model/role';

export const departmentList = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const departmentDDL = await Department.find();
    return responseWrapper(true, COMMON_MESSAGE.Success, 201, departmentDDL);
  },
);

export const roleList = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const roleDDL = await Role.find();
    return responseWrapper(true, COMMON_MESSAGE.Success, 201, roleDDL);
  },
);
