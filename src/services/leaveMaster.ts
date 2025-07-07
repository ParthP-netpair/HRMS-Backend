import { NextFunction, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import { AuthenticatedRequest } from '../middleware/auth';
import LeaveMasters from '../model/leaveMaster';
import responseWrapper from '../helpers/responseWrapper';
import { COMMON_MESSAGE } from '../utils/messages.enum';
import { TDecodedToken } from '../types/user';
import { checkLeaveOverlap } from '../commonFunction/common';
import LeaveManagement from '../model/leaveManagement';
import moment from 'moment';

export const createLeaveRequest = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { leaveManagementId, fromDate, toDate, reason, proofDocumentUrl } = req.body;
    const decodeToken = req.token as TDecodedToken;
    const userId = decodeToken?.user?._id;

    // Normalize and calculate requested leave days using UTC to avoid timezone issues
    const start = moment.utc(fromDate).startOf('day');
    const end = toDate ? moment.utc(toDate).endOf('day') : moment.utc(fromDate).endOf('day');
    const requestedDays = end.diff(start, 'days') + 1;

    // Check for date overlap
    const existingLeave = await checkLeaveOverlap({
      userId,
      leaveManagementId,
      fromDate,
      toDate,
    });

    if (existingLeave) {
      return responseWrapper(false, 'Leave already exists for this date range.', 400, null);
    }

    // Fetch leave type and quota
    const leaveManagement = await LeaveManagement.findOne({
      _id: leaveManagementId,
      isActive: true,
      isDeleted: false,
    });

    if (!leaveManagement) {
      return responseWrapper(false, 'Invalid leave type.', 400, null);
    }

    const leaveQuota = leaveManagement.count;

    // Calculate already used leave from takeLeave field
    const previousLeaves = await LeaveMasters.find({
      userId,
      leaveManagementId,
      status: 'Pending',
    });

    const usedDays = previousLeaves.reduce((sum, leave) => {
      return sum + (Number(leave.takeLeave) || 0);
    }, 0);

    // Quota exceeded check
    if (usedDays + requestedDays > leaveQuota) {
      return responseWrapper(
        false,
        `Leave quota exceeded. You have ${leaveQuota} total days, already used ${usedDays}.`,
        400,
        null,
      );
    }

    // Create leave request with takeLeave field
    const leaveCreate = await LeaveMasters.create({
      userId,
      leaveManagementId,
      fromDate: start.toDate(),
      toDate: end.toDate(),
      reason,
      proofDocumentUrl,
      takeLeave: requestedDays,
      createdBy: userId,
    });

    return responseWrapper(true, COMMON_MESSAGE.Success, 201, leaveCreate);
  },
);

export const updateLeaveRequest = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const decodeToken = req.token as TDecodedToken;
    const userId = decodeToken?.user?._id;
    const { _id, leaveManagementId, fromDate, toDate, reason, proofDocumentUrl } = req.body;

    const updatedLeave = await LeaveMasters.findByIdAndUpdate(
      _id,
      {
        leaveManagementId,
        fromDate,
        toDate,
        reason,
        proofDocumentUrl,
        updatedBy: userId,
      },
      { new: true },
    );

    if (!updatedLeave) {
      return responseWrapper(false, COMMON_MESSAGE.NotFound.replace('{param}', 'Leave'), 404);
    }

    return responseWrapper(true, COMMON_MESSAGE.Success, 200, updatedLeave);
  },
);

export const getOneLeaveRequest = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { _id } = req.body;

    const LeaveNotFound = await LeaveMasters.findOne({
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

export const deleteLeaveRequest = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const decodeToken = req.token as TDecodedToken;
    const userId = decodeToken?.user?._id;
    const { _id } = req.body;

    const leave = await LeaveMasters.findByIdAndUpdate(
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
      return responseWrapper(false, COMMON_MESSAGE.NotFound.replace('{param}', 'Leave'), 404);
    }

    return responseWrapper(true, 'Deleted Successfully', 200);
  },
);
