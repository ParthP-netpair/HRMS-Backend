import { NextFunction, Response } from 'express';
import responseWrapper from '../helpers/responseWrapper';
import asyncHandler from '../middleware/asyncHandler';
import { AuthenticatedRequest } from '../middleware/auth';
import Designation from '../model/designation';
import { COMMON_MESSAGE } from '../utils/messages.enum';

export const designation = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { name, roleId, departmentId, description } = req.body;
    const DesgnationData = await Designation.create({ name, roleId, departmentId, description });
    return responseWrapper(true, COMMON_MESSAGE.Success, 201, DesgnationData);
  },
);
export const designationList = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const DesignationData = await Designation.find({ isActive: true, isDeleted: false });
    return responseWrapper(true, COMMON_MESSAGE.Success, 201, DesignationData);
  },
);
export const getOneDesignation = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { _id } = req.body;

    if (!_id) {
      return responseWrapper(false, '_id is required!', 404);
    }
    const DesgnationData = await Designation.find({ _id, isActive: true, isDeleted: false });
    return responseWrapper(true, COMMON_MESSAGE.Success, 201, DesgnationData);
  },
);

export const updateDesignation = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { _id, name, roleId, departmentId, description } = req.body;

    if (!_id) {
      return responseWrapper(false, 'Designation ID (_id) is required', 400, null);
    }

    const updatedDesignation = await Designation.findByIdAndUpdate(
      _id,
      {
        name,
        roleId,
        departmentId,
        description,
      },
      { new: true }, // return updated document
    );

    if (!updatedDesignation) {
      return responseWrapper(false, 'Designation not found', 404, null);
    }

    return responseWrapper(true, COMMON_MESSAGE.Success, 200, updatedDesignation);
  },
);
