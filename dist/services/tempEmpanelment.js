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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.empanelProviderService = exports.tempEmpanelForLegalService = exports.editTempEmpanelByDcService = exports.editTempEmpanelByNw = exports.proceedDocusignService = exports.getOneTempEmpanelService = exports.changeStatusByLegal = exports.changeStatusByNw = exports.tempEmpanelByStatusService = exports.dcVerificationCountService = exports.createSelfTempEmpanelmentService = exports.createManualTempEmpanelmentService = void 0;
const mongoose_1 = require("mongoose");
const responseWrapper_1 = __importDefault(require("../helpers/responseWrapper"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const childTicket_1 = __importDefault(require("../model/childTicket"));
const tempEmpanelment_1 = __importDefault(require("../model/tempEmpanelment"));
const ticket_1 = require("../types/ticket");
const messages_enum_1 = require("../utils/messages.enum");
const freshdesk_1 = require("./freshdesk");
const tempEmpanelment_2 = require("../types/tempEmpanelment");
const user_1 = require("../types/user");
const json_stable_stringify_1 = __importDefault(require("json-stable-stringify"));
const tempProspectiveProvider_1 = __importDefault(require("../model/tempProspectiveProvider"));
const pincode_1 = __importDefault(require("../model/pincode"));
const childTicket_2 = require("../types/childTicket");
const paginateResult_1 = __importStar(require("../helpers/paginateResult"));
const constants_1 = require("../utils/constants");
const provider_1 = __importDefault(require("../model/provider"));
const providerLabTest_1 = __importDefault(require("../model/providerLabTest"));
const insuranceCompany_1 = __importDefault(require("../model/insuranceCompany"));
const providerInsurer_1 = __importDefault(require("../model/providerInsurer"));
const providerStaff_1 = __importDefault(require("../model/providerStaff"));
const env_config_1 = __importDefault(require("../config/env.config"));
const tempEmpanelEditTrack_1 = __importDefault(require("../model/tempEmpanelEditTrack"));
const ticket_2 = __importDefault(require("../model/ticket"));
const partialEmpanelment_1 = __importDefault(require("../model/partialEmpanelment"));
const docusign_1 = __importStar(require("../docusign"));
const getEnvelopeHistory_1 = __importDefault(require("../docusign/getEnvelopeHistory"));
const { ObjectId } = mongoose_1.Types;
const getProviderIncrementalId = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const last = yield tempEmpanelment_1.default.findOne({}, { incrementalId: 1 })
            .sort({ createdAt: -1 })
            .exec();
        const lastId = (_a = last === null || last === void 0 ? void 0 : last.incrementalId) !== null && _a !== void 0 ? _a : '000000';
        const nextIdNumber = parseInt(lastId, 10) + 1;
        const incrementalId = nextIdNumber.toString().padStart(6, '0');
        return incrementalId;
    }
    catch (error) {
        return null;
    }
});
const getRandomSixDigitString = () => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return randomNumber.toString().padStart(6, '0');
};
exports.createManualTempEmpanelmentService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e, _f, _g, _h;
    const user = (_b = req === null || req === void 0 ? void 0 : req.token) === null || _b === void 0 ? void 0 : _b.user;
    const tempProspectiveProviderId = (_c = req.body) === null || _c === void 0 ? void 0 : _c.tempProspectiveProviderId;
    const temp = (_d = (yield tempProspectiveProvider_1.default.findById(tempProspectiveProviderId))) === null || _d === void 0 ? void 0 : _d.toJSON();
    const { providerName, zone, contactPersonName, email, pincodeId, contactNo, parentDbId, parentFdId, } = temp;
    const pin = yield pincode_1.default.findById(pincodeId);
    const status = ticket_1.EFdStatus.ManualEmpanelmentSubmitted;
    const priority = ticket_1.EFdPriority.Low;
    const request_type = ticket_1.ERequestType.Empanel;
    const fdPayload = {
        status: ticket_1.EFdStatus.Open,
        priority,
        subject: 'DC Empanelment request',
        email: user === null || user === void 0 ? void 0 : user.email,
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
        },
        cc_emails: ['vishvajeet.zala@alineahealthcare.in'],
    };
    const fdRes = yield (0, freshdesk_1.createTicketService)(fdPayload);
    if (!(fdRes === null || fdRes === void 0 ? void 0 : fdRes.success)) {
        return (0, responseWrapper_1.default)(false, messages_enum_1.COMMON_MESSAGE.Error, 400, null, fdRes === null || fdRes === void 0 ? void 0 : fdRes.error);
    }
    const ticket = (_e = fdRes === null || fdRes === void 0 ? void 0 : fdRes.response) === null || _e === void 0 ? void 0 : _e.data;
    const r = yield (0, freshdesk_1.updateTicketService)(ticket === null || ticket === void 0 ? void 0 : ticket.id, { status });
    if (!(r === null || r === void 0 ? void 0 : r.success)) {
        return (0, responseWrapper_1.default)(false, messages_enum_1.COMMON_MESSAGE.Error, 400, null, r === null || r === void 0 ? void 0 : r.error);
    }
    const upTicket = (_f = r === null || r === void 0 ? void 0 : r.response) === null || _f === void 0 ? void 0 : _f.data;
    const childTicket = yield childTicket_1.default.create({
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
        fdAssociationType: ticket_1.EFdAssociationType.Child,
        tempProspectiveProviderId,
        empanelType: childTicket_2.EEmpanelmentType.Manual,
    });
    const childTicketDbId = childTicket._id;
    const childTicketFdId = childTicket.ticketId;
    const extra = {
        parentTicketDbId: childTicket.parentDbId,
        parentTicketFdId: childTicket.parentFdId,
        childTicketDbId,
        childTicketFdId,
        tempProspectiveProviderId: childTicket.tempProspectiveProviderId,
    };
    childTicket.statusId = status;
    yield childTicket.save();
    let incrementalId = yield getProviderIncrementalId();
    if (incrementalId)
        incrementalId = getRandomSixDigitString();
    const partialEmpanelment = (_g = (yield partialEmpanelment_1.default.findOne({
        tempProspectiveProviderId: new ObjectId(tempProspectiveProviderId),
        isDeleted: false,
    }))) === null || _g === void 0 ? void 0 : _g.toJSON();
    const { updatedBy, updatedAt, _id, createdAt, createdBy, deletedAt, deletedBy, isActive, isDeleted, tempProspectiveProviderId: x, availableTestIds } = partialEmpanelment, rest = __rest(partialEmpanelment, ["updatedBy", "updatedAt", "_id", "createdAt", "createdBy", "deletedAt", "deletedBy", "isActive", "isDeleted", "tempProspectiveProviderId", "availableTestIds"]);
    const t = yield tempEmpanelment_1.default.create(Object.assign(Object.assign(Object.assign({}, rest), extra), { availableTestIds: (_h = availableTestIds === null || availableTestIds === void 0 ? void 0 : availableTestIds.map(x => new ObjectId(x))) !== null && _h !== void 0 ? _h : [], incrementalId, createdBy: user === null || user === void 0 ? void 0 : user._id }));
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 201);
}));
exports.createSelfTempEmpanelmentService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k;
    const tempProspectiveProviderId = (_j = req.body) === null || _j === void 0 ? void 0 : _j.tempProspectiveProviderId;
    const childTicket = yield childTicket_1.default.findOne({
        tempProspectiveProviderId: new ObjectId(tempProspectiveProviderId),
        isDeleted: false,
    });
    const childTicketDbId = childTicket._id;
    if (!childTicket) {
        const msg = messages_enum_1.COMMON_MESSAGE.NotFound.replace(`{param}`, 'Ticket');
        return (0, responseWrapper_1.default)(false, msg, 400, null);
    }
    const alreadyExist = yield tempEmpanelment_1.default.findOne({
        childTicketDbId: new ObjectId(childTicketDbId),
        isDeleted: false,
    });
    if (alreadyExist) {
        const msg = messages_enum_1.COMMON_MESSAGE.AlreadyExist.replace(`{param}`, 'Empanelment');
        return (0, responseWrapper_1.default)(false, msg, 400, null);
    }
    const childTicketFdId = childTicket.ticketId;
    const status = ticket_1.EFdStatus.DocumentSubmittedByDC;
    const fdRes = yield (0, freshdesk_1.updateTicketService)(Number(childTicketFdId), { status });
    if (!(fdRes === null || fdRes === void 0 ? void 0 : fdRes.success)) {
        return (0, responseWrapper_1.default)(false, messages_enum_1.COMMON_MESSAGE.Error, 400, null, fdRes === null || fdRes === void 0 ? void 0 : fdRes.error);
    }
    const extra = {
        parentTicketDbId: childTicket.parentDbId,
        parentTicketFdId: childTicket.parentFdId,
        childTicketDbId,
        childTicketFdId,
        tempProspectiveProviderId: childTicket.tempProspectiveProviderId,
    };
    childTicket.statusId = status;
    yield childTicket.save();
    let incrementalId = yield getProviderIncrementalId();
    if (incrementalId)
        incrementalId = getRandomSixDigitString();
    const partialEmpanelment = (_k = (yield partialEmpanelment_1.default.findOne({
        tempProspectiveProviderId: new ObjectId(tempProspectiveProviderId),
        isDeleted: false,
    }))) === null || _k === void 0 ? void 0 : _k.toJSON();
    const { updatedBy, updatedAt, _id, createdAt, createdBy, deletedAt, deletedBy, isActive, isDeleted, tempProspectiveProviderId: x } = partialEmpanelment, rest = __rest(partialEmpanelment, ["updatedBy", "updatedAt", "_id", "createdAt", "createdBy", "deletedAt", "deletedBy", "isActive", "isDeleted", "tempProspectiveProviderId"]);
    const t = yield tempEmpanelment_1.default.create(Object.assign(Object.assign(Object.assign({}, rest), extra), { incrementalId }));
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 201);
}));
exports.dcVerificationCountService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.token.user;
    const isNw = user.role === user_1.EUserRole.Network;
    const pendingMatch = {
        [isNw ? 'verificationStatusByNw' : 'verificationStatusByLegal']: tempEmpanelment_2.EVerificationProcess.Pending,
        isDeleted: false,
    };
    const verifiedMatch = {
        [isNw ? 'verificationStatusByNw' : 'verificationStatusByLegal']: tempEmpanelment_2.EVerificationProcess.Pending,
        isDeleted: false,
    };
    if (isNw) {
        verifiedMatch.verificationStatusByLegal = { $ne: tempEmpanelment_2.EVerificationProcess.ReturnedByLegal };
    }
    if (!isNw) {
        pendingMatch.verificationStatusByNw = tempEmpanelment_2.EVerificationProcess.Verified;
    }
    const pending = yield tempEmpanelment_1.default.count(pendingMatch);
    const verified = yield tempEmpanelment_1.default.count(verifiedMatch);
    const returnedByLegal = yield tempEmpanelment_1.default.count({
        verificationStatusByLegal: tempEmpanelment_2.EVerificationProcess.ReturnedByLegal,
        isDeleted: false,
    });
    const data = { pending, verified };
    if (isNw)
        data.returnedByLegal = returnedByLegal;
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, data);
}));
exports.tempEmpanelByStatusService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.token.user;
    const { search, currentPage = 1, limitPerPage = 10, sortParam, sortOrder = -1, } = req.body;
    const isNw = user.role === user_1.EUserRole.Network;
    const match = {
        isDeleted: false,
    };
    if (search && search !== '') {
        const searchQuery = { $regex: search, $options: 'i' };
        match['$or'] = [
            { 'basicDetails.pincode': searchQuery },
            { 'basicDetails.providerName': searchQuery },
            { parentTicketFdId: searchQuery },
            { childTicketFdId: searchQuery },
        ];
    }
    const skip = limitPerPage * currentPage - limitPerPage;
    const sort = sortParam || 'updatedAt';
    const records = yield tempEmpanelment_1.default.aggregate([
        {
            $match: match,
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.User,
                localField: 'verifiedByLegalUser',
                foreignField: '_id',
                pipeline: [
                    {
                        $project: {
                            name: 1,
                        },
                    },
                ],
                as: 'legalUser',
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.User,
                localField: 'verifiedByNwUser',
                foreignField: '_id',
                pipeline: [
                    {
                        $project: {
                            name: 1,
                        },
                    },
                ],
                as: 'nwUser',
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.User,
                localField: 'createdBy',
                foreignField: '_id',
                as: 'createdByUser',
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
                from: constants_1.COLLECTIONS.User,
                localField: 'returnedByLegalUser',
                foreignField: '_id',
                as: 'returnedByLegalUser',
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
                from: constants_1.COLLECTIONS.ChildTicket,
                localField: 'childTicketDbId',
                foreignField: '_id',
                as: 'childTicket',
                pipeline: [
                    {
                        $match: {
                            statusId: { $nin: [ticket_1.EFdStatus.Closed, ticket_1.EFdStatus.EmpanelmentSuccessful] },
                        },
                    },
                    {
                        $project: {
                            ticketId: 1,
                            statusId: 1,
                            dueBy: 1,
                            empanelType: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: '$legalUser',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $unwind: {
                path: '$childTicket',
            },
        },
        {
            $unwind: {
                path: '$nwUser',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $unwind: {
                path: '$createdByUser',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $unwind: {
                path: '$returnedByLegalUser',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [
                        '$basicDetails',
                        {
                            _id: '$_id',
                            createdAt: '$createdAt',
                            incrementalId: '$incrementalId',
                            empanelmentStatus: '$empanelmentStatus',
                            verifiedByLegalDate: '$verifiedByLegalDate',
                            verifiedByNwDate: '$verifiedByNwDate',
                            returnedByLegalDate: '$returnedByLegalDate',
                            nwUser: '$nwUser',
                            legalUser: '$legalUser',
                            createdByUser: '$createdByUser',
                            returnedByLegalUser: '$returnedByLegalUser',
                            nwUserName: '$nwUser.name',
                            legalUserName: '$legalUser.name',
                            createdByUserName: '$createdByUser.name',
                            returnedByLegalUserName: '$returnedByLegalUser.name',
                            verificationStatusByLegal: '$verificationStatusByLegal',
                            verificationStatusByNw: '$verificationStatusByNw',
                            parentTicketFdId: '$parentTicketFdId',
                            childTicketFdId: '$childTicketFdId',
                            childTicket: '$childTicket',
                            childTicketStatus: '$childTicket.statusId',
                            empanelType: '$childTicket.empanelType',
                            childTicketDdId: '$childTicket._id',
                            nwUnverifiedFields: '$nwUnverifiedFields',
                            legalUnverifiedFields: '$legalUnverifiedFields',
                        },
                    ],
                },
            },
        },
        { $sort: { [sort]: sortOrder } },
        ...(0, paginateResult_1.facetStage)(skip, limitPerPage),
    ]);
    const data = (0, paginateResult_1.default)(records, currentPage, limitPerPage);
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, data);
}));
exports.changeStatusByNw = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m;
    const user = req.token.user;
    const { status, remark, id, nwUnverifiedFields } = req.body;
    const r = yield tempEmpanelment_1.default.findById(id);
    const nwVerificationHistory = [
        ...((_l = r === null || r === void 0 ? void 0 : r.nwVerificationHistory) !== null && _l !== void 0 ? _l : []),
        {
            statusFrom: r === null || r === void 0 ? void 0 : r.verificationStatusByNw,
            statusTo: status,
            updatedBy: user._id,
            updatedAt: new Date(),
            remark,
        },
    ];
    const update = {
        nwVerificationHistory,
        verificationStatusByNw: status,
    };
    if (nwUnverifiedFields)
        update.nwUnverifiedFields = nwUnverifiedFields;
    const childTicket = yield childTicket_1.default.findById(r.childTicketDbId);
    let fdStatus = ticket_1.EFdStatus.IssueInDocumentNw;
    const fdPayload = {};
    if (status === tempEmpanelment_2.EVerificationProcess.Verified) {
        update.verifiedByNwUser = user._id;
        update.verifiedByNwDate = new Date();
        fdStatus = ticket_1.EFdStatus.ForwardedToLegalAfterQC1;
        fdPayload.status = fdStatus;
        if (r.verificationStatusByLegal === tempEmpanelment_2.EVerificationProcess.ReturnedByLegal) {
            update.verificationStatusByLegal = tempEmpanelment_2.EVerificationProcess.Pending;
        }
    }
    else {
        const cf_empanelment_link = `${(0, env_config_1.default)('FRONTEND_URL')}/empanelment/auto-empanelment/edit/${id}`;
        fdPayload.status = fdStatus;
        fdPayload.email = childTicket === null || childTicket === void 0 ? void 0 : childTicket.email;
        fdPayload.custom_fields = {
            cf_empanelment_link,
            cf_documentissuesremark: remark,
        };
        r.isEditable = true;
    }
    const fdRes = yield (0, freshdesk_1.updateTicketService)(Number(r === null || r === void 0 ? void 0 : r.childTicketFdId), Object.assign(Object.assign({}, fdPayload), { status: fdStatus }));
    if (!(fdRes === null || fdRes === void 0 ? void 0 : fdRes.success)) {
        return (0, responseWrapper_1.default)(false, messages_enum_1.COMMON_MESSAGE.Error, 400, null, fdRes === null || fdRes === void 0 ? void 0 : fdRes.error);
    }
    const childTicketHistory = [
        ...((_m = childTicket === null || childTicket === void 0 ? void 0 : childTicket.history) !== null && _m !== void 0 ? _m : []),
        {
            statusFrom: childTicket.statusId,
            statusTo: fdStatus,
            updatedBy: user === null || user === void 0 ? void 0 : user._id,
            updatedAt: new Date(),
        },
    ];
    childTicket.history = childTicketHistory;
    childTicket.statusId = fdStatus;
    yield childTicket.save();
    Object.assign(r, update);
    yield r.save();
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200);
}));
exports.changeStatusByLegal = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p;
    const user = req.token.user;
    const { status, remark, id, legalUnverifiedFields } = req.body;
    const r = yield tempEmpanelment_1.default.findById(id);
    const childTicket = yield childTicket_1.default.findById(r.childTicketDbId);
    const legalVerificationHistory = [
        ...((_o = r === null || r === void 0 ? void 0 : r.legalVerificationHistory) !== null && _o !== void 0 ? _o : []),
        {
            statusFrom: r === null || r === void 0 ? void 0 : r.verificationStatusByLegal,
            statusTo: status,
            updatedBy: user._id,
            updatedAt: new Date(),
            remark,
        },
    ];
    const update = {
        legalVerificationHistory,
        verificationStatusByLegal: status,
    };
    if (legalUnverifiedFields)
        update.legalUnverifiedFields = legalUnverifiedFields;
    let fdStatus = ticket_1.EFdStatus.IssueInDocumentLegal;
    const fdPayload = {};
    if (status === tempEmpanelment_2.EVerificationProcess.Verified) {
        update.verifiedByLegalUser = user._id;
        update.verifiedByLegalDate = new Date();
        fdStatus = ticket_1.EFdStatus.DocumentVerifiedByLegal;
    }
    if (status === tempEmpanelment_2.EVerificationProcess.ReturnedByLegal) {
        update.returnedByLegalUser = user === null || user === void 0 ? void 0 : user._id;
        update.returnedByLegalDate = new Date();
        r.verificationStatusByNw = tempEmpanelment_2.EVerificationProcess.Pending;
    }
    if (status === tempEmpanelment_2.EVerificationProcess.ReturnedByLegalProvider) {
        update.returnedByLegalUser = user === null || user === void 0 ? void 0 : user._id;
        update.returnedByLegalDate = new Date();
        fdStatus = ticket_1.EFdStatus.IssueInDocumentByLegalForProvider;
        const cf_empanelment_link = `${(0, env_config_1.default)('FRONTEND_URL')}/empanelment/auto-empanelment/edit/${id}`;
        fdPayload.email = childTicket === null || childTicket === void 0 ? void 0 : childTicket.email;
        fdPayload.custom_fields = {
            cf_empanelment_link,
            cf_documentissuesremark: remark,
        };
        r.isEditable = true;
    }
    const fdRes = yield (0, freshdesk_1.updateTicketService)(Number(r === null || r === void 0 ? void 0 : r.childTicketFdId), Object.assign({ status: fdStatus }, fdPayload));
    if (!(fdRes === null || fdRes === void 0 ? void 0 : fdRes.success)) {
        return (0, responseWrapper_1.default)(false, messages_enum_1.COMMON_MESSAGE.Error, 400, null, fdRes === null || fdRes === void 0 ? void 0 : fdRes.error);
    }
    Object.assign(r, update);
    const childTicketHistory = [
        ...((_p = childTicket === null || childTicket === void 0 ? void 0 : childTicket.history) !== null && _p !== void 0 ? _p : []),
        {
            statusFrom: childTicket.statusId,
            statusTo: fdStatus,
            updatedBy: user === null || user === void 0 ? void 0 : user._id,
            updatedAt: new Date(),
        },
    ];
    childTicket.history = childTicketHistory;
    childTicket.statusId = fdStatus;
    yield childTicket.save();
    yield r.save();
    if (status === tempEmpanelment_2.EVerificationProcess.Verified) {
        req.body = { id, isRetry: false };
        yield (0, exports.proceedDocusignService)(req, res, next);
    }
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200);
}));
exports.getOneTempEmpanelService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const record = yield tempEmpanelment_1.default.aggregate([
        {
            $match: {
                _id: new ObjectId(id),
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
            $lookup: {
                from: constants_1.COLLECTIONS.ChildTicket,
                localField: 'childTicketDbId',
                foreignField: '_id',
                pipeline: [
                    {
                        $project: {
                            statusId: 1,
                            empanelType: 1,
                        },
                    },
                ],
                as: 'childTicket',
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
                path: '$childTicket',
            },
        },
        {
            $unwind: {
                path: '$staff',
                preserveNullAndEmptyArrays: true,
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
                documents: { $first: '$documents' },
                verificationStatusByNw: { $first: '$verificationStatusByNw' },
                nwVerificationHistory: { $first: '$nwVerificationHistory' },
                verifiedByNwUser: { $first: '$verifiedByNwUser' },
                verifiedByNwDate: { $first: '$verifiedByNwDate' },
                verificationStatusByLegal: { $first: '$verificationStatusByLegal' },
                legalVerificationHistory: { $first: '$legalVerificationHistory' },
                verifiedByLegalUser: { $first: '$verifiedByLegalUser' },
                verifiedByLegalDate: { $first: '$verifiedByLegalDate' },
                docusignDetails: { $first: '$docusignDetails' },
                empanelmentStatus: { $first: '$empanelmentStatus' },
                parentTicketDbId: { $first: '$parentTicketDbId' },
                parentTicketFdId: { $first: '$parentTicketFdId' },
                childTicketDbId: { $first: '$childTicketDbId' },
                childTicketFdId: { $first: '$childTicketFdId' },
                tempProspectiveProviderId: { $first: '$tempProspectiveProviderId' },
                availableTestIds: { $first: '$availableTestIds' },
                childTicket: { $first: '$childTicket' },
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
                isEditable: { $first: '$isEditable' },
                nwUnverifiedFields: { $first: '$nwUnverifiedFields' },
                legalUnverifiedFields: { $first: '$legalUnverifiedFields' },
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
                documents: { $first: '$documents' },
                verificationStatusByNw: { $first: '$verificationStatusByNw' },
                nwVerificationHistory: { $first: '$nwVerificationHistory' },
                verifiedByNwUser: { $first: '$verifiedByNwUser' },
                verifiedByNwDate: { $first: '$verifiedByNwDate' },
                verificationStatusByLegal: { $first: '$verificationStatusByLegal' },
                legalVerificationHistory: { $first: '$legalVerificationHistory' },
                verifiedByLegalUser: { $first: '$verifiedByLegalUser' },
                verifiedByLegalDate: { $first: '$verifiedByLegalDate' },
                docusignDetails: { $first: '$docusignDetails' },
                empanelmentStatus: { $first: '$empanelmentStatus' },
                parentTicketDbId: { $first: '$parentTicketDbId' },
                parentTicketFdId: { $first: '$parentTicketFdId' },
                childTicketDbId: { $first: '$childTicketDbId' },
                childTicketFdId: { $first: '$childTicketFdId' },
                tempProspectiveProviderId: { $first: '$tempProspectiveProviderId' },
                childTicket: { $first: '$childTicket' },
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
                isEditable: { $first: '$isEditable' },
                nwUnverifiedFields: { $first: '$nwUnverifiedFields' },
                legalUnverifiedFields: { $first: '$legalUnverifiedFields' },
            },
        },
    ]);
    if (!record.length) {
        return (0, responseWrapper_1.default)(false, messages_enum_1.COMMON_MESSAGE.Error, 404);
    }
    const data = Object.assign({}, record[0]);
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, data);
}));
exports.proceedDocusignService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _q, _r, _s;
    const { id, isRetry = false } = req.body;
    const user = (_q = req === null || req === void 0 ? void 0 : req.token) === null || _q === void 0 ? void 0 : _q.user;
    const temp = yield tempEmpanelment_1.default.findById(id);
    const tempPr = yield tempProspectiveProvider_1.default.findById(temp === null || temp === void 0 ? void 0 : temp.tempProspectiveProviderId);
    const childTicket = yield childTicket_1.default.findById(temp === null || temp === void 0 ? void 0 : temp.childTicketDbId);
    const fdStatus = ticket_1.EFdStatus.DocusignProcessStarted;
    const fdRes = yield (0, freshdesk_1.updateTicketService)(Number(childTicket === null || childTicket === void 0 ? void 0 : childTicket.ticketId), {
        status: fdStatus,
    });
    if (!(fdRes === null || fdRes === void 0 ? void 0 : fdRes.success)) {
        return (0, responseWrapper_1.default)(false, messages_enum_1.COMMON_MESSAGE.Error, 400, null, fdRes === null || fdRes === void 0 ? void 0 : fdRes.error);
    }
    const docusignDetails = yield (0, docusign_1.default)({
        signers: [
            {
                signerEmail: tempPr === null || tempPr === void 0 ? void 0 : tempPr.email,
                signerName: tempPr === null || tempPr === void 0 ? void 0 : tempPr.providerName,
            },
        ],
        tempEmpanelId: id,
    });
    temp.docusignDetails = docusignDetails;
    temp.docusignRetryCount = ((_r = temp === null || temp === void 0 ? void 0 : temp.docusignRetryCount) !== null && _r !== void 0 ? _r : 0) + 1;
    const childTicketHistory = [
        ...((_s = childTicket === null || childTicket === void 0 ? void 0 : childTicket.history) !== null && _s !== void 0 ? _s : []),
        {
            statusFrom: childTicket.statusId,
            statusTo: fdStatus,
            updatedBy: user === null || user === void 0 ? void 0 : user._id,
            updatedAt: new Date(),
        },
    ];
    childTicket.history = childTicketHistory;
    childTicket.statusId = fdStatus;
    yield temp.save();
    yield childTicket.save();
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 201);
}));
exports.editTempEmpanelByNw = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _t;
    const user = req.token.user;
    const _u = req.body, { id } = _u, rest = __rest(_u, ["id"]);
    const r = yield tempEmpanelment_1.default.findById(id);
    const up = yield tempEmpanelment_1.default.findByIdAndUpdate(id, {
        $set: Object.assign(Object.assign({}, rest), { updatedBy: user._id }),
    }, { new: true });
    const previousData = {
        basicDetails: r.basicDetails,
        contactDetails: r.contactDetails,
        ownershipDetails: r.ownershipDetails,
        bankDetails: r.bankDetails,
        staff: r.staff,
        availableTestIds: r === null || r === void 0 ? void 0 : r.availableTestIds,
    };
    const updatedData = {
        basicDetails: up.basicDetails,
        contactDetails: up.contactDetails,
        ownershipDetails: up.ownershipDetails,
        bankDetails: up.bankDetails,
        staff: up.staff,
        availableTestIds: up === null || up === void 0 ? void 0 : up.availableTestIds,
    };
    yield tempEmpanelEditTrack_1.default.create({
        tempEmpanelId: id,
        updatedData,
        previousData,
        updatedByDc: false,
        createdBy: user._id,
        updatedBy: user._id,
    });
    if (r.verificationStatusByLegal === tempEmpanelment_2.EVerificationProcess.ReturnedByLegal) {
        const statusTo = tempEmpanelment_2.EVerificationProcess.Pending;
        const legalVerificationHistory = [
            ...((_t = r === null || r === void 0 ? void 0 : r.legalVerificationHistory) !== null && _t !== void 0 ? _t : []),
            {
                statusFrom: r === null || r === void 0 ? void 0 : r.verificationStatusByLegal,
                statusTo,
                updatedBy: user._id,
                updatedAt: new Date(),
                remark: '',
            },
        ];
        r.verificationStatusByLegal = statusTo;
        r.legalVerificationHistory = legalVerificationHistory;
        yield r.save();
    }
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200);
}));
exports.editTempEmpanelByDcService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _v;
    const _w = req.body, { id } = _w, rest = __rest(_w, ["id"]);
    const r = yield tempEmpanelment_1.default.findById(id);
    const up = yield tempEmpanelment_1.default.findByIdAndUpdate(id, { $set: Object.assign(Object.assign({}, rest), { isEditable: false }) }, { new: true });
    const previousData = {
        basicDetails: r.basicDetails,
        contactDetails: r.contactDetails,
        ownershipDetails: r.ownershipDetails,
        bankDetails: r.bankDetails,
        staff: r.staff,
        availableTestIds: r.availableTestIds,
    };
    const updatedData = {
        basicDetails: up.basicDetails,
        contactDetails: up.contactDetails,
        ownershipDetails: up.ownershipDetails,
        bankDetails: up.bankDetails,
        staff: up.staff,
        availableTestIds: up === null || up === void 0 ? void 0 : up.availableTestIds,
    };
    yield tempEmpanelEditTrack_1.default.create({
        tempEmpanelId: id,
        previousData,
        updatedData,
        updatedByDc: true,
    });
    if (r.verificationStatusByLegal === tempEmpanelment_2.EVerificationProcess.ReturnedByLegalProvider) {
        const statusTo = tempEmpanelment_2.EVerificationProcess.Pending;
        const legalVerificationHistory = [
            ...((_v = r === null || r === void 0 ? void 0 : r.legalVerificationHistory) !== null && _v !== void 0 ? _v : []),
            {
                statusFrom: r === null || r === void 0 ? void 0 : r.verificationStatusByLegal,
                statusTo,
                updatedAt: new Date(),
                remark: '',
            },
        ];
        r.verificationStatusByLegal = statusTo;
        r.legalVerificationHistory = legalVerificationHistory;
        yield r.save();
    }
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200);
}));
exports.tempEmpanelForLegalService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.token.user;
    const { search, currentPage = 1, limitPerPage = 10, sortParam, sortOrder = -1 } = req.body;
    const match = {
        isDeleted: false,
        verificationStatusByNw: tempEmpanelment_2.EVerificationProcess.Verified,
        verificationStatusByLegal: { $ne: tempEmpanelment_2.EVerificationProcess.ReturnedByLegal },
    };
    if (search && search !== '') {
        const searchQuery = { $regex: search, $options: 'i' };
        match['$or'] = [
            { 'basicDetails.pincode': searchQuery },
            { 'basicDetails.providerName': searchQuery },
            { parentTicketFdId: searchQuery },
            { childTicketFdId: searchQuery },
        ];
    }
    const skip = limitPerPage * currentPage - limitPerPage;
    const sort = sortParam || 'updatedAt';
    const records = yield tempEmpanelment_1.default.aggregate([
        {
            $match: match,
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.User,
                localField: 'verifiedByLegalUser',
                foreignField: '_id',
                pipeline: [
                    {
                        $project: {
                            name: 1,
                        },
                    },
                ],
                as: 'legalUser',
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.User,
                localField: 'verifiedByNwUser',
                foreignField: '_id',
                pipeline: [
                    {
                        $project: {
                            name: 1,
                        },
                    },
                ],
                as: 'nwUser',
            },
        },
        {
            $lookup: {
                from: constants_1.COLLECTIONS.User,
                localField: 'createdBy',
                foreignField: '_id',
                as: 'createdByUser',
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
                from: constants_1.COLLECTIONS.User,
                localField: 'returnedByLegalUser',
                foreignField: '_id',
                as: 'returnedByLegalUser',
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
                from: constants_1.COLLECTIONS.ChildTicket,
                localField: 'childTicketDbId',
                foreignField: '_id',
                as: 'childTicket',
                pipeline: [
                    {
                        $project: {
                            ticketId: 1,
                            statusId: 1,
                            dueBy: 1,
                            empanelType: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: '$legalUser',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $unwind: {
                path: '$childTicket',
            },
        },
        {
            $unwind: {
                path: '$nwUser',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $unwind: {
                path: '$createdByUser',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $unwind: {
                path: '$returnedByLegalUser',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [
                        '$basicDetails',
                        {
                            _id: '$_id',
                            createdAt: '$createdAt',
                            incrementalId: '$incrementalId',
                            empanelmentStatus: '$empanelmentStatus',
                            verifiedByLegalDate: '$verifiedByLegalDate',
                            verifiedByNwDate: '$verifiedByNwDate',
                            returnedByLegalDate: '$returnedByLegalDate',
                            nwUser: '$nwUser',
                            legalUser: '$legalUser',
                            createdByUser: '$createdByUser',
                            returnedByLegalUser: '$returnedByLegalUser',
                            nwUserName: '$nwUser.name',
                            legalUserName: '$legalUser.name',
                            createdByUserName: '$createdByUser.name',
                            returnedByLegalUserName: '$returnedByLegalUser.name',
                            verificationStatusByLegal: '$verificationStatusByLegal',
                            verificationStatusByNw: '$verificationStatusByNw',
                            parentTicketFdId: '$parentTicketFdId',
                            childTicketFdId: '$childTicketFdId',
                            childTicket: '$childTicket',
                            childTicketStatus: '$childTicket.statusId',
                            empanelType: '$childTicket.empanelType',
                            childTicketDdId: '$childTicket._id',
                            docusignDetails: '$docusignDetails',
                            nwUnverifiedFields: '$nwUnverifiedFields',
                            legalUnverifiedFields: '$legalUnverifiedFields',
                            docusignRetryCount: '$docusignRetryCount',
                            envelopeStatus: '$docusignDetails.envelopeStatus',
                            envelopeId: '$docusignDetails.envelopeId',
                            envelopeDate: '$docusignDetails.envelopeDate',
                            envelopeUri: '$docusignDetails.envelopeUri',
                            envelopeExpireDate: '$docusignDetails.envelopeExpireDate',
                            canRetry: {
                                $cond: {
                                    if: {
                                        $and: [
                                            { $lt: ['$docusignRetryCount', Number((0, env_config_1.default)('DOCUSIGN_MAX_RETRY_COUNT'))] },
                                            { $gt: [new Date(), '$docusignDetails.envelopeExpireDate'] },
                                            { $ne: ['$docusignDetails.envelopeStatus', docusign_1.EDocusignStatus.completed] },
                                            {
                                                $ne: ['$docusignDetails.envelopeId', null],
                                            },
                                            {
                                                $ne: [
                                                    {
                                                        $type: '$docusignDetails.envelopeId',
                                                    },
                                                    'missing',
                                                ],
                                            },
                                        ],
                                    },
                                    then: true,
                                    else: false,
                                },
                            },
                        },
                    ],
                },
            },
        },
        { $sort: { [sort]: sortOrder } },
        ...(0, paginateResult_1.facetStage)(skip, limitPerPage),
    ]);
    const data = (0, paginateResult_1.default)(records, currentPage, limitPerPage);
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, data);
}));
exports.empanelProviderService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _x, _y, _z, _0, _1, _2;
    const user = (_x = req === null || req === void 0 ? void 0 : req.token) === null || _x === void 0 ? void 0 : _x.user;
    const tempEmpanelId = (_y = req === null || req === void 0 ? void 0 : req.body) === null || _y === void 0 ? void 0 : _y.id;
    const temp = yield tempEmpanelment_1.default.findById(tempEmpanelId);
    const result = yield (0, getEnvelopeHistory_1.default)((_z = temp === null || temp === void 0 ? void 0 : temp.docusignDetails) === null || _z === void 0 ? void 0 : _z.envelopeId);
    if (!result) {
        return (0, responseWrapper_1.default)(false, messages_enum_1.COMMON_MESSAGE.Error, 400);
    }
    if (((_0 = result === null || result === void 0 ? void 0 : result.envelope) === null || _0 === void 0 ? void 0 : _0.envelopeStatus) !== docusign_1.EDocusignStatus.completed) {
        return (0, responseWrapper_1.default)(false, 'Wait for docusign process to get completed.', 400);
    }
    const p = yield provider_1.default.create(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, temp.basicDetails), temp.contactDetails), temp.ownershipDetails), temp.bankDetails), { incrementalId: temp === null || temp === void 0 ? void 0 : temp.incrementalId, documents: temp === null || temp === void 0 ? void 0 : temp.documents, createdBy: user === null || user === void 0 ? void 0 : user._id }));
    const providerId = p._id;
    const tests = temp === null || temp === void 0 ? void 0 : temp.availableTestIds.map(testId => ({ testId, providerId }));
    const insurers = (_1 = (yield insuranceCompany_1.default.find({ isActive: true, isDeleted: false }))) === null || _1 === void 0 ? void 0 : _1.map(x => ({
        insurerId: x._id,
        providerId,
    }));
    const staffData = temp === null || temp === void 0 ? void 0 : temp.staff.map((_a) => {
        var { _id } = _a, x = __rest(_a, ["_id"]);
        return (Object.assign(Object.assign({}, x), { providerId }));
    });
    yield providerLabTest_1.default.insertMany(tests);
    yield providerInsurer_1.default.insertMany(insurers);
    yield providerStaff_1.default.insertMany(staffData);
    const pendingChildTickets = yield childTicket_1.default.findOne({
        parentDbId: new mongoose_1.Types.ObjectId(temp === null || temp === void 0 ? void 0 : temp.parentTicketDbId),
        statusId: {
            $nin: [ticket_1.EFdStatus.Closed, ticket_1.EFdStatus.EmpanelmentSuccessful, ticket_1.EFdStatus.DocusignProcessCompleted],
        },
        isDeleted: false,
    });
    if (!pendingChildTickets) {
        const closed = ticket_1.EFdStatus.Closed;
        const ticket = yield ticket_2.default.findById(temp.parentTicketDbId);
        const ticketHistory = [
            ...((_2 = ticket === null || ticket === void 0 ? void 0 : ticket.history) !== null && _2 !== void 0 ? _2 : []),
            {
                statusFrom: ticket.statusId,
                statusTo: closed,
                updatedBy: user === null || user === void 0 ? void 0 : user._id,
                updatedAt: new Date(),
            },
        ];
        ticket.history = ticketHistory;
        ticket.statusId = closed;
        ticket.closedAt = new Date();
        ticket.closedBy = user === null || user === void 0 ? void 0 : user._id;
        yield ticket.save();
        (0, freshdesk_1.updateTicketService)(Number(temp === null || temp === void 0 ? void 0 : temp.parentTicketFdId), {
            status: closed,
        });
    }
    temp.docusignDetails = result.envelope;
    temp.empanelmentStatus = tempEmpanelment_2.EDCEmpanelmentStatus.Registered;
    yield temp.save();
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200);
}));
