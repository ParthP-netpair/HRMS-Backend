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
exports.prospectiveProviderDetailsService = exports.listOpenChildReqService = exports.getProspectiveProviderService = exports.deleteProspectiveProviderService = exports.addProspectiveProviderService = exports.createProspectiveProviderService = void 0;
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
const childTicket_1 = __importDefault(require("../model/childTicket"));
const tempProspectiveProvider_1 = __importDefault(require("../model/tempProspectiveProvider"));
const childTicket_2 = require("../types/childTicket");
const common_1 = require("../helpers/common");
const env_config_1 = __importDefault(require("../config/env.config"));
const tempEmpanelment_1 = __importDefault(require("../model/tempEmpanelment"));
const partialEmpanelment_1 = __importDefault(require("../model/partialEmpanelment"));
const { ObjectId } = mongoose_1.Types;
exports.createProspectiveProviderService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const user = (_a = req === null || req === void 0 ? void 0 : req.token) === null || _a === void 0 ? void 0 : _a.user;
    const { providerName, zone, contactPersonName, email, pincode, contactNo, parentDbId } = req.body;
    const exist = yield tempProspectiveProvider_1.default.findOne({
        email,
        contactNo,
        providerName,
        isDeleted: false,
    });
    if (exist) {
        return (0, responseWrapper_1.default)(false, "There' an existing record with the same Email,Contact number and Provider name", 400, {
            _id: exist === null || exist === void 0 ? void 0 : exist._id,
            email: exist === null || exist === void 0 ? void 0 : exist.email,
            contactNo: exist === null || exist === void 0 ? void 0 : exist.contactNo,
        });
    }
    let pin = yield pincode_1.default.findOne({ pincode });
    if (!pin) {
        pin = yield pincode_1.default.create(Object.assign(Object.assign({}, (_b = req.body) === null || _b === void 0 ? void 0 : _b.pincodeData), { pincode, createdBy: user === null || user === void 0 ? void 0 : user._id, zone: (_c = req.body) === null || _c === void 0 ? void 0 : _c.zone }));
    }
    const parent = yield ticket_1.default.findById(parentDbId);
    const t = yield tempProspectiveProvider_1.default.create({
        createdBy: user === null || user === void 0 ? void 0 : user._id,
        pincode: pin.pincode,
        pincodeId: pin === null || pin === void 0 ? void 0 : pin._id,
        zone,
        providerName,
        email,
        contactNo,
        contactPersonName,
        parentDbId,
        parentFdId: parent.ticketId,
    });
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 201);
}));
exports.addProspectiveProviderService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f, _g, _h, _j;
    const user = (_d = req === null || req === void 0 ? void 0 : req.token) === null || _d === void 0 ? void 0 : _d.user;
    const { id, empanelType } = req.body;
    const temp = (_e = (yield tempProspectiveProvider_1.default.findById(id))) === null || _e === void 0 ? void 0 : _e.toJSON();
    const { providerName, zone, contactPersonName, email, pincodeId, contactNo, parentDbId, parentFdId, } = temp;
    const pin = yield pincode_1.default.findById(pincodeId);
    const status = empanelType === childTicket_2.EEmpanelmentType.Auto
        ? ticket_2.EFdStatus.ForwardedToDC
        : ticket_2.EFdStatus.ManualEmpanelmentStart;
    const priority = ticket_2.EFdPriority.Low;
    const request_type = ticket_2.ERequestType.Empanel;
    const ticketExists = (_f = (yield childTicket_1.default.findOne({ tempProspectiveProviderId: new ObjectId(id) }))) === null || _f === void 0 ? void 0 : _f.toJSON();
    if (ticketExists) {
        const fdRes = yield (0, freshdesk_1.updateTicketService)(Number(ticketExists === null || ticketExists === void 0 ? void 0 : ticketExists.ticketId), { status });
        if (!fdRes.success) {
            return (0, responseWrapper_1.default)(false, messages_enum_1.COMMON_MESSAGE.Error, 400, null, fdRes === null || fdRes === void 0 ? void 0 : fdRes.error);
        }
        const childTicket = yield childTicket_1.default.findById(ticketExists === null || ticketExists === void 0 ? void 0 : ticketExists._id);
        const childTicketHistory = [
            ...((_g = childTicket === null || childTicket === void 0 ? void 0 : childTicket.history) !== null && _g !== void 0 ? _g : []),
            {
                statusFrom: childTicket.statusId,
                statusTo: status,
                updatedBy: user === null || user === void 0 ? void 0 : user._id,
                updatedAt: new Date(),
            },
        ];
        childTicket.history = childTicketHistory;
        childTicket.statusId = status;
        childTicket.empanelType = empanelType;
        yield childTicket.save();
        return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200);
    }
    const cf_empanelment_link = `${(0, env_config_1.default)('FRONTEND_URL')}/empanelment/auto-empanelment/${id}`;
    const fdPayload = {
        status: ticket_2.EFdStatus.Open,
        priority,
        subject: 'DC Empanelment request',
        email: email,
        parent_id: Number(parentFdId),
        custom_fields: {
            cf_diagnostic_centre_pincode: pin === null || pin === void 0 ? void 0 : pin.pincode,
            cf_request_type: request_type,
            cf_diagnostic_centre_name: providerName,
            cf_select_your_zone: zone,
            cf_diagnostic_centre_state: pin.state,
            cf_diagnostic_centre_city: pin.city,
            cf_flscontact: contactPersonName,
            cf_diagnostic_centre_contact_number: contactNo,
            cf_diagnostic_center_email_id: email,
            cf_empanelment_link,
        },
        cc_emails: ['vishvajeet.zala@alineahealthcare.in'],
    };
    const fdRes = yield (0, freshdesk_1.createTicketService)(fdPayload);
    if (!fdRes.success) {
        return (0, responseWrapper_1.default)(false, messages_enum_1.COMMON_MESSAGE.Error, 400, null, fdRes === null || fdRes === void 0 ? void 0 : fdRes.error);
    }
    const ticket = (_h = fdRes === null || fdRes === void 0 ? void 0 : fdRes.response) === null || _h === void 0 ? void 0 : _h.data;
    yield (0, common_1.asyncDelay)();
    const r = yield (0, freshdesk_1.updateTicketService)(ticket === null || ticket === void 0 ? void 0 : ticket.id, { status });
    if (!(r === null || r === void 0 ? void 0 : r.success)) {
        return (0, responseWrapper_1.default)(false, messages_enum_1.COMMON_MESSAGE.Error, 400, null, r === null || r === void 0 ? void 0 : r.error);
    }
    const upTicket = (_j = r === null || r === void 0 ? void 0 : r.response) === null || _j === void 0 ? void 0 : _j.data;
    const t = yield childTicket_1.default.create({
        ticketId: String(ticket === null || ticket === void 0 ? void 0 : ticket.id),
        statusId: status,
        priorityId: priority,
        createdBy: user === null || user === void 0 ? void 0 : user._id,
        dueBy: new Date(ticket === null || ticket === void 0 ? void 0 : ticket.due_by),
        pincode: pin.pincode,
        fdResponse: (0, json_stable_stringify_1.default)(ticket),
        pincodeId: pin === null || pin === void 0 ? void 0 : pin._id,
        requestType: request_type,
        zone,
        providerName,
        email,
        contactNo,
        contactPersonName,
        parentDbId,
        parentFdId,
        fdAssociationType: ticket_2.EFdAssociationType.Child,
        tempProspectiveProviderId: id,
        empanelType,
    });
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200);
}));
exports.deleteProspectiveProviderService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    const user = (_k = req === null || req === void 0 ? void 0 : req.token) === null || _k === void 0 ? void 0 : _k.user;
    const { id } = req.body;
    yield tempProspectiveProvider_1.default.findByIdAndUpdate(id, {
        $set: {
            deletedAt: new Date(),
            isDeleted: true,
            isActive: false,
            deletedBy: user === null || user === void 0 ? void 0 : user._id,
        },
    });
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200);
}));
exports.getProspectiveProviderService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _l;
    const user = (_l = req === null || req === void 0 ? void 0 : req.token) === null || _l === void 0 ? void 0 : _l.user;
    const { id } = req.body;
    const records = yield tempProspectiveProvider_1.default.aggregate([
        {
            $match: {
                parentDbId: new ObjectId(id),
                isDeleted: false,
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.ChildTicket,
                localField: '_id',
                foreignField: 'tempProspectiveProviderId',
                pipeline: [
                    {
                        $project: {
                            fdResponse: 0,
                            priorityId: 0,
                            sourceId: 0,
                            groupId: 0,
                            history: 0,
                        },
                    },
                ],
                as: 'ticket',
            },
        },
        { $unwind: { path: '$ticket', preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.PartialEmpanelment,
                localField: '_id',
                foreignField: 'tempProspectiveProviderId',
                pipeline: [
                    {
                        $match: {
                            isDeleted: false,
                        },
                    },
                    {
                        $project: {
                            empanelType: 1,
                        },
                    },
                ],
                as: 'partialEmpanel',
            },
        },
        { $unwind: { path: '$partialEmpanel', preserveNullAndEmptyArrays: true } },
        {
            $addFields: {
                isDisabled: {
                    $cond: {
                        if: { $ne: [{ $ifNull: ['$ticket', null] }, null] },
                        then: true,
                        else: false,
                    },
                },
                empanelType: '$ticket.empanelType',
                partialEmpanelType: '$partialEmpanel.empanelType',
                ticketId: '$ticket.ticketId',
                actionDate: '$ticket.createdAt',
            },
        },
        {
            $project: { ticket: 0 },
        },
        { $sort: { createdAt: -1 } },
    ]);
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, records);
}));
exports.listOpenChildReqService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, currentPage = 1, limitPerPage = 10, sortParam, sortOrder = -1 } = req.body;
    const match = {
        isDeleted: false,
        $nor: [
            {
                statusId: ticket_2.EFdStatus.Closed,
            },
        ],
    };
    if (search && search !== '') {
        const searchQuery = { $regex: search, $options: 'i' };
        match['$or'] = [
            { pincode: searchQuery },
            { providerName: searchQuery },
            { ticketId: searchQuery },
            { parentFdId: searchQuery },
        ];
    }
    const skip = limitPerPage * currentPage - limitPerPage;
    const sort = sortParam || 'createdAt';
    const records = yield childTicket_1.default.aggregate([
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
                from: constants_1.COLLECTIONS.Ticket,
                localField: 'parentDbId',
                foreignField: '_id',
                pipeline: [
                    {
                        $match: {
                            statusId: { $nin: [ticket_2.EFdStatus.Closed] },
                        },
                    },
                ],
                as: 'parentTicket',
            },
        },
        {
            $unwind: '$parentTicket',
        },
        {
            $addFields: {
                createdByName: '$createdByObj.name',
                createdById: '$createdByObj._id',
                requestedPin: '$parentTicket.pincode',
            },
        },
        {
            $project: {
                fdResponse: 0,
                history: 0,
                createdByObj: 0,
                __v: 0,
                updatedAt: 0,
                parentTicket: 0,
            },
        },
        { $sort: { [sort]: sortOrder } },
        ...(0, paginateResult_1.facetStage)(skip, limitPerPage),
    ]);
    const data = (0, paginateResult_1.default)(records, currentPage, limitPerPage);
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, data);
}));
exports.prospectiveProviderDetailsService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _m;
    const user = (_m = req === null || req === void 0 ? void 0 : req.token) === null || _m === void 0 ? void 0 : _m.user;
    const { id } = req.body;
    const record = yield tempProspectiveProvider_1.default.aggregate([
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.Pincode,
                localField: 'pincodeId',
                foreignField: '_id',
                as: 'pincode',
            },
        },
        {
            $unwind: {
                path: '$pincode',
                preserveNullAndEmptyArrays: true,
            },
        },
    ]);
    if (!record.length) {
        return (0, responseWrapper_1.default)(false, messages_enum_1.COMMON_MESSAGE.Error, 404);
    }
    const tempEmpanelment = yield tempEmpanelment_1.default.findOne({
        tempProspectiveProviderId: new ObjectId(id),
        isDeleted: false,
    });
    const partialEmpanelment = yield partialEmpanelment_1.default.aggregate([
        {
            $match: {
                tempProspectiveProviderId: new ObjectId(id),
                isDeleted: false,
            },
        },
        {
            $addFields: {
                'ownershipDetails.ownershipTypeId': { $toObjectId: '$ownershipDetails.ownershipTypeId' },
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.OwnershipType,
                localField: 'ownershipDetails.ownershipTypeId',
                foreignField: '_id',
                as: 'ownershipDetails.ownershipType',
            },
        },
        {
            $unwind: {
                path: '$ownershipDetails.ownershipType',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $unwind: {
                path: '$staff',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $addFields: {
                'staff.qualificationId': { $toObjectId: '$staff.qualificationId' },
                'staff.councilId': { $toObjectId: '$staff.councilId' },
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.Qualification,
                localField: 'staff.qualificationId',
                foreignField: '_id',
                as: 'staff.qualification',
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.Council,
                localField: 'staff.councilId',
                foreignField: '_id',
                as: 'staff.council',
            },
        },
        {
            $unwind: {
                path: '$staff.qualification',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $unwind: {
                path: '$staff.council',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $group: {
                _id: '$_id',
                basicDetails: { $first: '$basicDetails' },
                contactDetails: { $first: '$contactDetails' },
                ownershipDetails: { $first: '$ownershipDetails' },
                bankDetails: { $first: '$bankDetails' },
                tempProspectiveProviderId: { $first: '$tempProspectiveProviderId' },
                availableTestIds: { $first: '$availableTestIds' },
                staff: {
                    $push: {
                        $cond: [
                            {
                                $and: [{ $ne: ['$staff', null] }, { $ne: ['$staff', []] }, { $ne: ['$staff', {}] }],
                            },
                            '$staff',
                            '$$REMOVE',
                        ],
                    },
                },
                createdAt: { $first: '$createdAt' },
                updatedAt: { $first: '$updatedAt' },
                createdBy: { $first: '$createdBy' },
                isActive: { $first: '$isActive' },
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.TestMaster,
                localField: 'availableTestIds',
                foreignField: '_id',
                as: 'availableTestIds',
            },
        },
        {
            $unwind: {
                path: '$availableTestIds',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.TestCategory,
                localField: 'availableTestIds.categoryId',
                foreignField: '_id',
                as: 'availableTestIds.category',
                pipeline: [
                    {
                        $project: { name: 1, code: 1 },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: '$availableTestIds.category',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $group: {
                _id: '$_id',
                basicDetails: { $first: '$basicDetails' },
                contactDetails: { $first: '$contactDetails' },
                ownershipDetails: { $first: '$ownershipDetails' },
                bankDetails: { $first: '$bankDetails' },
                tempProspectiveProviderId: { $first: '$tempProspectiveProviderId' },
                availableTestIds: {
                    $push: {
                        $cond: [
                            {
                                $and: [
                                    { $ne: ['$availableTestIds', null] },
                                    { $ne: ['$availableTestIds', []] },
                                    { $ne: ['$availableTestIds', {}] },
                                ],
                            },
                            '$availableTestIds',
                            '$$REMOVE',
                        ],
                    },
                },
                staff: { $first: '$staff' },
                createdAt: { $first: '$createdAt' },
                updatedAt: { $first: '$updatedAt' },
                createdBy: { $first: '$createdBy' },
                isActive: { $first: '$isActive' },
            },
        },
    ]);
    const data = Object.assign(Object.assign({}, record[0]), { alreadySubmitted: tempEmpanelment ? true : false, partialEmpanelmentStarted: partialEmpanelment.length ? true : false, partialEmpanelment: partialEmpanelment[0] });
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, data);
}));
