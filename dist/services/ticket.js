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
exports.getTicketDetailsService = exports.listClosedReqService = exports.listNewReqService = exports.createEmpanelTicketService = void 0;
const mongoose_1 = require("mongoose");
const responseWrapper_1 = __importDefault(require("../helpers/responseWrapper"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const pincode_1 = __importDefault(require("../model/pincode"));
const ticket_1 = __importDefault(require("../model/ticket"));
const ticket_2 = require("../types/ticket");
const messages_enum_1 = require("../utils/messages.enum");
const freshdesk_1 = require("./freshdesk");
const json_stable_stringify_1 = __importDefault(require("json-stable-stringify"));
const paginateResult_1 = __importStar(require("../helpers/paginateResult"));
const constants_1 = require("../utils/constants");
const { ObjectId } = mongoose_1.Types;
exports.createEmpanelTicketService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    const user = (_a = req === null || req === void 0 ? void 0 : req.token) === null || _a === void 0 ? void 0 : _a.user;
    const pincode = (_b = req.body) === null || _b === void 0 ? void 0 : _b.pincode;
    let pin = yield pincode_1.default.findOne({ pincode });
    if (!pin) {
        pin = yield pincode_1.default.create(Object.assign(Object.assign({}, (_c = req.body) === null || _c === void 0 ? void 0 : _c.pincodeData), { pincode, createdBy: user === null || user === void 0 ? void 0 : user._id, zone: (_d = req.body) === null || _d === void 0 ? void 0 : _d.zone }));
    }
    const status = ticket_2.EFdStatus.Open;
    const priority = ticket_2.EFdPriority.Low;
    const request_type = ticket_2.ERequestType.Empanel;
    const zone = (_e = req.body) === null || _e === void 0 ? void 0 : _e.zone;
    const remark = (_f = req.body) === null || _f === void 0 ? void 0 : _f.remark;
    const fdPayload = {
        status,
        priority,
        subject: 'DC Empanelment request',
        email: user === null || user === void 0 ? void 0 : user.email,
        description: req.body.remark,
        custom_fields: {
            cf_diagnostic_centre_pincode: pincode,
            cf_request_type: request_type,
            cf_select_your_zone: zone,
            cf_other_detailsif_any: remark,
        },
        cc_emails: ['vishvajeet.zala@alineahealthcare.in'],
    };
    const fdRes = yield (0, freshdesk_1.createTicketService)(fdPayload);
    if (!fdRes.success) {
        return (0, responseWrapper_1.default)(false, messages_enum_1.COMMON_MESSAGE.Error, 400, null, fdRes === null || fdRes === void 0 ? void 0 : fdRes.error);
    }
    const ticket = (_g = fdRes === null || fdRes === void 0 ? void 0 : fdRes.response) === null || _g === void 0 ? void 0 : _g.data;
    const t = yield ticket_1.default.create({
        ticketId: String(ticket === null || ticket === void 0 ? void 0 : ticket.id),
        statusId: status,
        priorityId: priority,
        createdBy: user === null || user === void 0 ? void 0 : user._id,
        dueBy: new Date(ticket === null || ticket === void 0 ? void 0 : ticket.due_by),
        pincode,
        fdResponse: (0, json_stable_stringify_1.default)(ticket),
        pincodeId: pin === null || pin === void 0 ? void 0 : pin._id,
        requestType: request_type,
        remark,
        zone,
    });
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 201);
}));
exports.listNewReqService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, currentPage = 1, limitPerPage = 10, sortParam, sortOrder = -1 } = req.body;
    const match = {
        isDeleted: false,
        statusId: ticket_2.EFdStatus.Open,
    };
    if (search && search !== '') {
        const searchQuery = { $regex: search, $options: 'i' };
        match['$or'] = [
            { pincode: searchQuery },
            { zone: searchQuery },
            { ticketId: searchQuery },
            { requestType: searchQuery },
        ];
    }
    const skip = limitPerPage * currentPage - limitPerPage;
    const sort = sortParam || 'createdAt';
    const records = yield ticket_1.default.aggregate([
        { $match: match },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.ChildTicket,
                localField: '_id',
                foreignField: 'parentDbId',
                as: 'childTickets',
            },
        },
        {
            $match: {
                childTickets: { $size: 0 },
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.User,
                localField: 'createdBy',
                foreignField: '_id',
                as: 'createdByObj',
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.Pincode,
                localField: 'pincodeId',
                foreignField: '_id',
                as: 'pincodeObj',
            },
        },
        {
            $unwind: {
                path: '$pincodeObj',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $unwind: {
                path: '$createdByObj',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $addFields: {
                createdByName: '$createdByObj.name',
                createdById: '$createdByObj._id',
                childTicketsCount: { $size: '$childTickets' },
            },
        },
        {
            $project: {
                fdResponse: 0,
                activateForInsurerIds: 0,
                deactivateForInsurerIds: 0,
                history: 0,
                pincodeId: 0,
                createdByObj: 0,
                __v: 0,
                updatedAt: 0,
                childTickets: 0,
            },
        },
        { $sort: { [sort]: sortOrder } },
        ...(0, paginateResult_1.facetStage)(skip, limitPerPage),
    ]);
    const data = (0, paginateResult_1.default)(records, currentPage, limitPerPage);
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, data);
}));
exports.listClosedReqService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, currentPage = 1, limitPerPage = 10, sortParam, sortOrder = -1 } = req.body;
    const match = {
        isDeleted: false,
        statusId: ticket_2.EFdStatus.Closed,
    };
    if (search && search !== '') {
        const searchQuery = { $regex: search, $options: 'i' };
        match['$or'] = [
            { pincode: searchQuery },
            { zone: searchQuery },
            { ticketId: searchQuery },
            { requestType: searchQuery },
        ];
    }
    const skip = limitPerPage * currentPage - limitPerPage;
    const sort = sortParam || 'createdAt';
    const records = yield ticket_1.default.aggregate([
        { $match: match },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.User,
                localField: 'createdBy',
                foreignField: '_id',
                as: 'createdByObj',
            },
        },
        {
            $unwind: {
                path: '$createdByObj',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.User,
                localField: 'closedBy',
                foreignField: '_id',
                as: 'closedByObj',
            },
        },
        {
            $unwind: {
                path: '$closedByObj',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.Provider,
                localField: 'providerId',
                foreignField: '_id',
                as: 'provider',
                pipeline: [
                    {
                        $project: {
                            providerName: 1,
                            incrementalId: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: '$provider',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.Pincode,
                localField: 'pincodeId',
                foreignField: '_id',
                as: 'pincodeObj',
            },
        },
        {
            $unwind: {
                path: '$pincodeObj',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $addFields: {
                createdById: '$createdByObj._id',
                createdByName: '$createdByObj.name',
                closedByName: '$closedByObj.name',
                providerName: '$provider.providerName',
            },
        },
        {
            $project: {
                fdResponse: 0,
                activateForInsurerIds: 0,
                deactivateForInsurerIds: 0,
                history: 0,
                pincodeId: 0,
                createdByObj: 0,
                __v: 0,
                updatedAt: 0,
                closedByObj: 0,
            },
        },
        { $sort: { [sort]: sortOrder } },
        ...(0, paginateResult_1.facetStage)(skip, limitPerPage),
    ]);
    const data = (0, paginateResult_1.default)(records, currentPage, limitPerPage);
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, data);
}));
exports.getTicketDetailsService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, requestType } = req.body;
    const delistPipeline = [
        {
            $lookup: {
                from: constants_1.COLLECTIONS.DelistRequest,
                localField: '_id',
                pipeline: [
                    {
                        $match: {
                            isDeleted: false,
                        },
                    },
                    {
                        $lookup: {
                            from: constants_1.COLLECTIONS.User,
                            localField: 'createdBy',
                            foreignField: '_id',
                            as: 'createdByObj',
                            pipeline: [
                                {
                                    $project: {
                                        name: 1,
                                        role: 1,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $unwind: {
                            path: '$createdByObj',
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $lookup: {
                            from: constants_1.COLLECTIONS.Provider,
                            localField: 'providerId',
                            foreignField: '_id',
                            pipeline: [
                                {
                                    $project: {
                                        providerName: 1,
                                        incrementalId: 1,
                                        pincode: 1,
                                        state: 1,
                                        city: 1,
                                        zone: 1,
                                        addressLineOne: 1,
                                        addressLineTwo: 1,
                                        landmark: 1,
                                        telephone: 1,
                                        fax: 1,
                                        longitude: 1,
                                        latitude: 1,
                                        googlePlusCode: 1,
                                    },
                                },
                            ],
                            as: 'provider',
                        },
                    },
                    {
                        $unwind: '$provider',
                    },
                ],
                foreignField: 'ticketDbId',
                as: 'delistRequest',
            },
        },
        {
            $unwind: '$delistRequest',
        },
    ];
    const manageInsurerPipeline = [
        {
            $lookup: {
                from: constants_1.COLLECTIONS.ProviderInsurerRequest,
                localField: '_id',
                pipeline: [
                    {
                        $match: {
                            isDeleted: false,
                        },
                    },
                    {
                        $lookup: {
                            from: constants_1.COLLECTIONS.User,
                            localField: 'createdBy',
                            foreignField: '_id',
                            as: 'createdByObj',
                            pipeline: [
                                {
                                    $project: {
                                        name: 1,
                                        role: 1,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $lookup: {
                            from: constants_1.COLLECTIONS.Provider,
                            localField: 'providerId',
                            foreignField: '_id',
                            pipeline: [
                                {
                                    $project: {
                                        providerName: 1,
                                        incrementalId: 1,
                                        pincode: 1,
                                        state: 1,
                                        city: 1,
                                        zone: 1,
                                        addressLineOne: 1,
                                        addressLineTwo: 1,
                                        landmark: 1,
                                        telephone: 1,
                                        fax: 1,
                                        longitude: 1,
                                        latitude: 1,
                                        googlePlusCode: 1,
                                    },
                                },
                            ],
                            as: 'provider',
                        },
                    },
                    {
                        $unwind: {
                            path: '$createdByObj',
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $unwind: '$provider',
                    },
                    {
                        $lookup: {
                            from: constants_1.COLLECTIONS.InsuranceCompany,
                            localField: 'activateForInsurerIds',
                            foreignField: '_id',
                            as: 'activateForInsurers',
                            pipeline: [
                                {
                                    $project: {
                                        name: 1,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $lookup: {
                            from: constants_1.COLLECTIONS.InsuranceCompany,
                            localField: 'deactivateForInsurerIds',
                            foreignField: '_id',
                            as: 'deactivateForInsurers',
                            pipeline: [
                                {
                                    $project: {
                                        name: 1,
                                    },
                                },
                            ],
                        },
                    },
                ],
                foreignField: 'ticketDbId',
                as: 'insurerManageRequest',
            },
        },
    ];
    const records = yield ticket_1.default.aggregate([
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
        ...(requestType === ticket_2.ERequestType.Delist ? delistPipeline : []),
        ...([ticket_2.ERequestType.Activate, ticket_2.ERequestType.Deactivate].includes(requestType)
            ? manageInsurerPipeline
            : []),
        {
            $project: {
                fdResponse: 0,
                activateForInsurerIds: 0,
                deactivateForInsurerIds: 0,
                history: 0,
                pincodeId: 0,
                createdByObj: 0,
                __v: 0,
                updatedAt: 0,
            },
        },
    ]);
    const data = records[0];
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, data);
}));
