import { NextFunction, Response } from 'express';
import responseWrapper from '../helpers/responseWrapper';
import asyncHandler from '../middleware/asyncHandler';
import { AuthenticatedRequest } from '../middleware/auth';
import Department from '../model/department';
import Designation from '../model/designation';
import LeaveManagement from '../model/leaveManagement';
import LeaveType from '../model/leaveType';
import Role from '../model/role';
import { COMMON_MESSAGE } from '../utils/messages.enum';

export const departmentList = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const departmentDDL = await Department.find({ isActive: true, isDeleted: false });
    return responseWrapper(true, COMMON_MESSAGE.Success, 200, departmentDDL);
  },
);

export const roleList = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const roleDDL = await Role.find({ isActive: true, isDeleted: false });
    return responseWrapper(true, COMMON_MESSAGE.Success, 200, roleDDL);
  },
);

export const leaveTypeList = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const roleDDL = await LeaveType.find({ isActive: true, isDeleted: false });
    return responseWrapper(true, COMMON_MESSAGE.Success, 200, roleDDL);
  },
);

export const designationList = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const _id = req.params.id;
    const designationDDL = await Designation.find({
      departmentId: _id,
      isActive: true,
      isDeleted: false,
    })
      .populate({ path: 'roleId', select: 'name' }) // ✅ correct path
      .select('name _id roleId'); // ✅ also select roleId so it's included

    // const flattened = designationDDL.map(item => {
    //   const department = item.departmentId as unknown as {
    //     _id: mongoose.Types.ObjectId;
    //     name: string;
    //   };

    //   return {
    //     _id: item._id,
    //     name: item.name,
    //     description: item.description,
    //     departmentId: department._id,
    //     departmentName: department.name,
    //   };
    // });

    return responseWrapper(true, COMMON_MESSAGE.Success, 200, designationDDL);
  },
);
export const leaveManagementList = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const leaveManagementDDL = await LeaveManagement.find({
      isActive: true,
      isDeleted: false,
    });

    return responseWrapper(true, COMMON_MESSAGE.Success, 200, leaveManagementDDL);
  },
);
