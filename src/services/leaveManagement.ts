import { NextFunction, Response } from 'express';
import responseWrapper from '../helpers/responseWrapper';
import asyncHandler from '../middleware/asyncHandler';
import { AuthenticatedRequest } from '../middleware/auth';
import LeaveManagement from '../model/leaveManagement';
import { TDecodedToken } from '../types/user';
import { COMMON_MESSAGE } from '../utils/messages.enum';

export const createLeaveMangement = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const decodeToken = req.token as TDecodedToken;
    const userId = decodeToken?.user?._id;
    const { leaveTypeId, name, count, carryForward, encashable, requiresProof, remarks } = req.body;
    const leaveCreate = await LeaveManagement.create({
      leaveTypeId,
      name,
      count,
      carryForward,
      encashable,
      requiresProof,
      remarks,
      createdBy: userId,
    });
    return responseWrapper(true, COMMON_MESSAGE.Success, 201, leaveCreate);
  },
);

export const updateLeaveMangement = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const decodeToken = req.token as TDecodedToken;
    const userId = decodeToken?.user?._id;
    const { _id, leaveTypeId, name, count, carryForward, encashable, requiresProof, remarks } =
      req.body;

    const updatedLeave = await LeaveManagement.findByIdAndUpdate(
      _id,
      {
        leaveTypeId,
        name,
        count,
        carryForward,
        encashable,
        requiresProof,
        remarks,
        updatedBy: userId,
      },
      { new: true },
    );

    if (!updatedLeave) {
      return responseWrapper(
        false,
        COMMON_MESSAGE.NotFound.replace('{param}', 'Leave Management'),
        404,
      );
    }

    return responseWrapper(true, COMMON_MESSAGE.Success, 200, updatedLeave);
  },
);

export const getOneLeaveMangement = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { _id } = req.body;

    const LeaveNotFound = await LeaveManagement.findOne({
      _id,
      isActive: true,
      isDeleted: false,
    });

    if (!LeaveNotFound) {
      return responseWrapper(
        false,
        COMMON_MESSAGE.NotFound.replace('{param}', 'Leave Management'),
        404,
      );
    }

    return responseWrapper(true, COMMON_MESSAGE.Success, 200, LeaveNotFound);
  },
);

export const deleteLeaveMangement = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const decodeToken = req.token as TDecodedToken;
    const userId = decodeToken?.user?._id;
    const { _id } = req.body;

    const leave = await LeaveManagement.findByIdAndUpdate(
      _id,
      {
        isActive: false,
        isDeleted: true,
        deletedBy: userId,
        deletedAt: new Date(),
      },
      { new: true },
    );

    if (!leave) {
      return responseWrapper(
        false,
        COMMON_MESSAGE.NotFound.replace('{param}', 'Leave Management'),
        404,
      );
    }

    return responseWrapper(true, 'Deleted Successfully', 200);
  },
);
