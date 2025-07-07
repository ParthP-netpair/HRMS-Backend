import { NextFunction, Response } from 'express';
import responseWrapper from '../helpers/responseWrapper';
import asyncHandler from '../middleware/asyncHandler';
import { AuthenticatedRequest } from '../middleware/auth';
import Designation from '../model/designation';
import { COMMON_MESSAGE } from '../utils/messages.enum';
import paginateResult, { facetStage } from '../helpers/paginateResult';

export const designation = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { name, roleId, departmentId, description } = req.body;
    const DesgnationData = await Designation.create({ name, roleId, departmentId, description });
    return responseWrapper(true, COMMON_MESSAGE.Success, 201, DesgnationData);
  },
);
// export const designationList = asyncHandler(
//   async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     const {
//       currentPage = 1,
//       limitPerPage = 10,
//       sortParam = 'createdAt',
//       sortOrder = -1,
//       search = '',
//     } = req.body;

//     const page = Number(currentPage);
//     const limit = Number(limitPerPage);
//     const skip = (page - 1) * limit;

//     const matchStage: any = {
//       isActive: true,
//       isDeleted: false,
//     };

//     // Optional search
//     if (search?.trim()) {
//       matchStage.name = { $regex: search.trim(), $options: 'i' };
//     }

//     const sortStage = { [sortParam]: sortOrder };

//     const aggregatePipeline = [
//       { $match: matchStage },
//       {
//         $lookup: {
//           from: 'departments',
//           localField: 'departmentId',
//           foreignField: '_id',
//           as: 'departmentData',
//         },
//       },
//       {
//         $unwind: {
//           path: '$departmentData',
//           preserveNullAndEmptyArrays: true,
//         },
//       },
//       {
//         $project: {
//           name: 1,
//           departmentId: 1,
//           departmentName: '$departmentData.name',
//           createdAt: 1,
//           updatedAt: 1,
//           isActive: 1,
//           isDeleted: 1,
//         },
//       },
//       { $sort: sortStage },
//       ...facetStage(skip, limit),
//     ];

//     const DesignationData = await Designation.aggregate(aggregatePipeline);
//     const paginated = paginateResult(DesignationData, page, limit);

//     return responseWrapper(true, COMMON_MESSAGE.Success, 200, paginated);
//   },
// );

export const designationList = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const {
      currentPage = 1,
      limitPerPage = 10,
      sortParam = 'createdAt',
      sortOrder = -1,
      search = '',
    } = req.body;

    const page = Number(currentPage);
    const limit = Number(limitPerPage);
    const skip = (page - 1) * limit;

    // Build query conditions
    const query: any = {
      isActive: true,
      isDeleted: false,
    };

    if (search?.trim()) {
      query.name = { $regex: search.trim(), $options: 'i' };
    }

    // Fetch total count
    const totalItems = await Designation.countDocuments(query);

    // Fetch paginated data
    const designations = await Designation.find(query)
      .populate({
        path: 'departmentId',
        select: 'name',
      })
      .sort({ [sortParam]: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean(); // use lean for performance if no Mongoose instance methods are needed

    // Format results
    const formatted = designations.map((item: any) => ({
      _id: item._id,
      name: item.name,
      departmentId: item.departmentId?._id || null,
      departmentName: item.departmentId?.name || null,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      isActive: item.isActive,
      isDeleted: item.isDeleted,
    }));

    // Construct paginated response
    const result = {
      records: formatted,
      totalItems,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
    };

    return responseWrapper(true, COMMON_MESSAGE.Success, 200, result);
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
