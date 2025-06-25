"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerDetailsForManageService = exports.manageSearchProviderService = exports.providerDetailsService = exports.mainSearchProviderService = void 0;
const mongoose_1 = require("mongoose");
const paginateResult_1 = __importStar(require("../helpers/paginateResult"));
const responseWrapper_1 = __importDefault(require("../helpers/responseWrapper"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const provider_1 = __importDefault(require("../model/provider"));
const constants_1 = require("../utils/constants");
const messages_enum_1 = require("../utils/messages.enum");
const delistRequest_1 = require("../types/delistRequest");
const ticket_1 = require("../types/ticket");
const { ObjectId } = mongoose_1.Types;
exports.mainSearchProviderService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.token.user;
    const { search, currentPage = 1, limitPerPage = 10, sortParam, sortOrder = -1, testIds = [], } = req.body;
    const match = {
        isDeleted: false,
    };
    if (search && search !== '') {
        const searchQuery = { $regex: search, $options: 'i' };
        match['$or'] = [
            { pincode: searchQuery },
            { providerName: searchQuery },
            { city: searchQuery },
            { state: searchQuery },
            { incrementalId: searchQuery },
        ];
    }
    const searchWithTest = testIds.length > 0;
    const searchWithTestPipeline = [
        {
            $lookup: {
                from: constants_1.COLLECTIONS.ProviderLabTest,
                localField: '_id',
                foreignField: 'providerId',
                pipeline: [
                    {
                        $match: {
                            testId: { $in: testIds.map(id => new ObjectId(id)) },
                            isDeleted: false,
                        },
                    },
                ],
                as: 'tests',
            },
        },
        {
            $match: {
                'tests.0': { $exists: true },
            },
        },
    ];
    const skip = limitPerPage * currentPage - limitPerPage;
    const sort = sortParam || 'providerName';
    const records = yield provider_1.default.aggregate([
        {
            $match: match,
        },
        ...(searchWithTest ? searchWithTestPipeline : []),
        {
            $unset: 'tests',
        },
        {
            $project: {
                incrementalId: 1,
                providerName: 1,
                pincode: 1,
                state: 1,
                city: 1,
                zone: 1,
                addressLineOne: 1,
                addressLineTwo: 1,
                landmark: 1,
                telephone: 1,
                website: 1,
                fax: 1,
                longitude: 1,
                latitude: 1,
                googlePlusCode: 1,
            },
        },
        { $sort: { [sort]: sortOrder } },
        ...(0, paginateResult_1.facetStage)(skip, limitPerPage),
    ]);
    const data = (0, paginateResult_1.default)(records, currentPage, limitPerPage);
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, data);
}));
exports.providerDetailsService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const records = yield provider_1.default.aggregate([
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.ProviderLabTest,
                localField: '_id',
                pipeline: [
                    {
                        $match: {
                            isDeleted: false,
                        },
                    },
                    {
                        $lookup: {
                            from: constants_1.COLLECTIONS.TestMaster,
                            localField: 'testId',
                            foreignField: '_id',
                            pipeline: [
                                {
                                    $lookup: {
                                        from: constants_1.COLLECTIONS.TestCategory,
                                        localField: 'categoryId',
                                        foreignField: '_id',
                                        pipeline: [
                                            {
                                                $project: {
                                                    createdAt: 0,
                                                    updatedAt: 0,
                                                    __v: 0,
                                                },
                                            },
                                        ],
                                        as: 'category',
                                    },
                                },
                                {
                                    $unwind: '$category',
                                },
                                {
                                    $project: {
                                        createdAt: 0,
                                        updatedAt: 0,
                                        __v: 0,
                                    },
                                },
                            ],
                            as: 'test',
                        },
                    },
                    {
                        $unwind: '$test',
                    },
                    {
                        $addFields: {
                            categoryId: '$test.categoryId',
                            category: '$test.category',
                        },
                    },
                    {
                        $project: {
                            createdAt: 0,
                            updatedAt: 0,
                            __v: 0,
                            'test.category': 0,
                        },
                    },
                ],
                foreignField: 'providerId',
                as: 'tests',
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.ProviderStaff,
                localField: '_id',
                pipeline: [
                    {
                        $match: {
                            isDeleted: false,
                        },
                    },
                    {
                        $lookup: {
                            from: constants_1.COLLECTIONS.Council,
                            localField: 'councilId',
                            foreignField: '_id',
                            as: 'council',
                        },
                    },
                    {
                        $lookup: {
                            from: constants_1.COLLECTIONS.Qualification,
                            localField: 'qualificationId',
                            foreignField: '_id',
                            as: 'qualification',
                        },
                    },
                    {
                        $unwind: {
                            path: '$council',
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $unwind: {
                            path: '$qualification',
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $project: {
                            createdAt: 0,
                            updatedAt: 0,
                            __v: 0,
                        },
                    },
                ],
                foreignField: 'providerId',
                as: 'staff',
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.ProviderInsurer,
                foreignField: 'providerId',
                localField: '_id',
                pipeline: [
                    {
                        $match: {
                            isDeleted: false,
                        },
                    },
                    {
                        $lookup: {
                            from: constants_1.COLLECTIONS.InsuranceCompany,
                            foreignField: '_id',
                            localField: 'insurerId',
                            as: 'data',
                            pipeline: [
                                {
                                    $match: {
                                        isDeleted: false,
                                    },
                                },
                                {
                                    $project: { name: 1 },
                                },
                            ],
                        },
                    },
                    {
                        $unwind: '$data',
                    },
                    {
                        $addFields: {
                            name: '$data.name',
                        },
                    },
                    {
                        $project: {
                            createdAt: 0,
                            updatedAt: 0,
                            data: 0,
                            history: 0,
                            __v: 0,
                        },
                    },
                ],
                as: 'insurers',
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.OwnershipType,
                foreignField: '_id',
                localField: 'ownershipTypeId',
                pipeline: [
                    {
                        $project: {
                            createdAt: 0,
                            updatedAt: 0,
                            __v: 0,
                        },
                    },
                ],
                as: 'ownershipType',
            },
        },
        {
            $unwind: '$ownershipType',
        },
        {
            $addFields: { ownershipTypeName: '$ownershipType.name' },
        },
        {
            $project: {
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
            },
        },
    ]);
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, records[0]);
}));
exports.manageSearchProviderService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.token.user;
    const { search, currentPage = 1, limitPerPage = 10, sortParam, sortOrder = -1 } = req.body;
    const match = {
        isDeleted: false,
    };
    if (search && search !== '') {
        const searchQuery = { $regex: search, $options: 'i' };
        match['$or'] = [
            { pincode: searchQuery },
            { providerName: searchQuery },
            { city: searchQuery },
            { state: searchQuery },
            { incrementalId: searchQuery },
        ];
    }
    const skip = limitPerPage * currentPage - limitPerPage;
    const sort = sortParam || 'providerName';
    const records = yield provider_1.default.aggregate([
        {
            $match: match,
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.ProviderInsurer,
                localField: '_id',
                pipeline: [
                    {
                        $match: {
                            isDeleted: false,
                        },
                    },
                    {
                        $lookup: {
                            from: constants_1.COLLECTIONS.InsuranceCompany,
                            foreignField: '_id',
                            localField: 'insurerId',
                            as: 'data',
                            pipeline: [
                                {
                                    $match: {
                                        isDeleted: false,
                                    },
                                },
                                {
                                    $project: { name: 1 },
                                },
                            ],
                        },
                    },
                    {
                        $unwind: '$data',
                    },
                    {
                        $addFields: {
                            name: '$data.name',
                        },
                    },
                    {
                        $project: {
                            data: 0,
                            history: 0,
                        },
                    },
                ],
                foreignField: 'providerId',
                as: 'insurers',
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.DelistRequest,
                localField: '_id',
                pipeline: [
                    {
                        $match: {
                            status: delistRequest_1.EApprovalStatus.Pending,
                            isDeleted: false,
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            status: 1,
                        },
                    },
                ],
                foreignField: 'providerId',
                as: 'delistRequest',
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.ProviderInsurerRequest,
                localField: '_id',
                pipeline: [
                    {
                        $match: {
                            status: delistRequest_1.EApprovalStatus.Pending,
                            isDeleted: false,
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            status: 1,
                        },
                    },
                ],
                foreignField: 'providerId',
                as: 'modifyRequest',
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.User,
                foreignField: '_id',
                pipeline: [
                    {
                        $project: {
                            name: 1,
                            role: 1,
                        },
                    },
                ],
                localField: 'delistBy',
                as: 'delistBy',
            },
        },
        {
            $unwind: { path: '$delistBy', preserveNullAndEmptyArrays: true },
        },
        {
            $unwind: { path: '$modifyRequest', preserveNullAndEmptyArrays: true },
        },
        {
            $unwind: { path: '$delistRequest', preserveNullAndEmptyArrays: true },
        },
        {
            $project: {
                incrementalId: 1,
                providerName: 1,
                pincode: 1,
                state: 1,
                city: 1,
                zone: 1,
                addressLineOne: 1,
                addressLineTwo: 1,
                landmark: 1,
                telephone: 1,
                website: 1,
                fax: 1,
                longitude: 1,
                latitude: 1,
                googlePlusCode: 1,
                insurers: 1,
                delistRequest: 1,
                modifyRequest: 1,
                isDelist: 1,
                delistBy: 1,
            },
        },
        { $sort: { [sort]: sortOrder } },
        ...(0, paginateResult_1.facetStage)(skip, limitPerPage),
    ]);
    const data = (0, paginateResult_1.default)(records, currentPage, limitPerPage);
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, data);
}));
exports.providerDetailsForManageService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { ticketDbId, providerId, requestType } = req.body;
    const match = {
        _id: new ObjectId(providerId),
    };
    const isDelist = requestType === ticket_1.ERequestType.Delist;
    const pipeline = [
        {
            $match: match,
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.ProviderInsurer,
                localField: '_id',
                pipeline: [
                    {
                        $match: {
                            isDeleted: false,
                        },
                    },
                    {
                        $lookup: {
                            from: constants_1.COLLECTIONS.InsuranceCompany,
                            foreignField: '_id',
                            localField: 'insurerId',
                            as: 'data',
                            pipeline: [
                                {
                                    $match: {
                                        isDeleted: false,
                                    },
                                },
                                {
                                    $project: { name: 1 },
                                },
                            ],
                        },
                    },
                    {
                        $unwind: '$data',
                    },
                    {
                        $addFields: {
                            name: '$data.name',
                        },
                    },
                    {
                        $project: {
                            data: 0,
                            history: 0,
                        },
                    },
                ],
                foreignField: 'providerId',
                as: 'insurers',
            },
        },
        ...(isDelist
            ? [
                {
                    $lookup: {
                        from: constants_1.COLLECTIONS.DelistRequest,
                        localField: '_id',
                        pipeline: [
                            {
                                $match: {
                                    ticketDbId: new ObjectId(ticketDbId),
                                },
                            },
                        ],
                        foreignField: 'providerId',
                        as: 'delistRequest',
                    },
                },
                {
                    $unwind: { path: '$delistRequest', preserveNullAndEmptyArrays: true },
                },
            ]
            : [
                {
                    $lookup: {
                        from: constants_1.COLLECTIONS.ProviderInsurerRequest,
                        localField: '_id',
                        pipeline: [
                            {
                                $match: {
                                    ticketDbId: new ObjectId(ticketDbId),
                                },
                            },
                        ],
                        foreignField: 'providerId',
                        as: 'modifyRequest',
                    },
                },
                {
                    $unwind: { path: '$modifyRequest', preserveNullAndEmptyArrays: true },
                },
                {
                    $lookup: {
                        from: constants_1.COLLECTIONS.InsuranceCompany,
                        foreignField: '_id',
                        localField: 'activateForInsurerIds',
                        as: 'activateForInsurer',
                        pipeline: [
                            {
                                $project: { name: 1 },
                            },
                        ],
                    },
                },
                {
                    $lookup: {
                        from: constants_1.COLLECTIONS.InsuranceCompany,
                        foreignField: '_id',
                        localField: 'deactivateForInsurerIds',
                        as: 'deactivateForInsurer',
                        pipeline: [
                            {
                                $project: { name: 1 },
                            },
                        ],
                    },
                },
            ]),
    ];
    const records = yield provider_1.default.aggregate(pipeline);
    const data = records[0];
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, data);
}));
