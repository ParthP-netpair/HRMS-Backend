"use strict";
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
exports.providerInsurerReqStatusService = exports.providerInsurerManageByNwService = exports.providerInsurerManageTicketService = void 0;
const mongoose_1 = require("mongoose");
const responseWrapper_1 = __importDefault(require("../helpers/responseWrapper"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const providerInsurerRequest_1 = __importDefault(require("../model/providerInsurerRequest"));
const provider_1 = __importDefault(require("../model/provider"));
const ticket_1 = __importDefault(require("../model/ticket"));
const ticket_2 = require("../types/ticket");
const messages_enum_1 = require("../utils/messages.enum");
const freshdesk_1 = require("./freshdesk");
const json_stable_stringify_1 = __importDefault(require("json-stable-stringify"));
const delistRequest_1 = require("../types/delistRequest");
const providerInsurer_1 = __importDefault(require("../model/providerInsurer"));
const { ObjectId } = mongoose_1.Types;
exports.providerInsurerManageTicketService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const user = (_a = req === null || req === void 0 ? void 0 : req.token) === null || _a === void 0 ? void 0 : _a.user;
    const { id, activateForInsurerIds, deactivateForInsurerIds } = req.body;
    const provider = yield provider_1.default.findById(id);
    const status = ticket_2.EFdStatus.Open;
    const priority = ticket_2.EFdPriority.Low;
    let request_type = ticket_2.ERequestType.Deactivate;
    if (activateForInsurerIds.length)
        request_type = ticket_2.ERequestType.Activate;
    if (deactivateForInsurerIds.length)
        request_type = ticket_2.ERequestType.Deactivate;
    const zone = provider === null || provider === void 0 ? void 0 : provider.zone;
    const remark = '';
    const fdPayload = {
        status,
        priority,
        subject: `Insurer ${request_type} request`,
        email: user === null || user === void 0 ? void 0 : user.email,
        description: (_c = (_b = req.body) === null || _b === void 0 ? void 0 : _b.remark) !== null && _c !== void 0 ? _c : '',
        custom_fields: {
            cf_diagnostic_centre_pincode: provider.pincode,
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
    const ticket = (_d = fdRes === null || fdRes === void 0 ? void 0 : fdRes.response) === null || _d === void 0 ? void 0 : _d.data;
    const t = yield ticket_1.default.create({
        ticketId: String(ticket === null || ticket === void 0 ? void 0 : ticket.id),
        statusId: status,
        priorityId: priority,
        createdBy: user === null || user === void 0 ? void 0 : user._id,
        dueBy: new Date(ticket === null || ticket === void 0 ? void 0 : ticket.due_by),
        pincode: provider.pincode,
        fdResponse: (0, json_stable_stringify_1.default)(ticket),
        pincodeId: provider.pincodeId,
        requestType: request_type,
        remark,
        zone,
        providerId: id,
    });
    yield providerInsurerRequest_1.default.create({
        providerId: id,
        createdBy: user._id,
        ticketDbId: t._id,
        ticketFdId: t.ticketId,
        activateForInsurerIds,
        deactivateForInsurerIds,
    });
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 201);
}));
exports.providerInsurerManageByNwService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const user = (_e = req === null || req === void 0 ? void 0 : req.token) === null || _e === void 0 ? void 0 : _e.user;
    const { id, activateForInsurerIds, deactivateForInsurerIds } = req.body;
    const providerInsurers = yield providerInsurer_1.default.find({
        providerId: new ObjectId(id),
        insurerId: { $in: [...activateForInsurerIds, deactivateForInsurerIds] },
        isDeleted: false,
    });
    const bulkOps = providerInsurers.map(rec => {
        var _a;
        const changeStatusTo = activateForInsurerIds === null || activateForInsurerIds === void 0 ? void 0 : activateForInsurerIds.includes(rec.insurerId);
        const history = [
            ...((_a = rec.history) !== null && _a !== void 0 ? _a : []),
            {
                statusFrom: rec.isActive,
                statusTo: changeStatusTo,
                updatedBy: user === null || user === void 0 ? void 0 : user._id,
                updatedAt: new Date(),
                remark: '',
            },
        ];
        return {
            updateOne: {
                filter: { _id: rec._id },
                update: {
                    $set: { isActive: changeStatusTo, history },
                },
            },
        };
    });
    yield providerInsurer_1.default.bulkWrite(bulkOps);
    yield providerInsurerRequest_1.default.create({
        providerId: id,
        status: delistRequest_1.EApprovalStatus.Approved,
        createdBy: user._id,
        activateForInsurerIds,
        deactivateForInsurerIds,
    });
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200);
}));
exports.providerInsurerReqStatusService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h;
    const user = (_f = req === null || req === void 0 ? void 0 : req.token) === null || _f === void 0 ? void 0 : _f.user;
    const { id, status } = req.body;
    const r = yield providerInsurerRequest_1.default.findOne({ ticketDbId: new ObjectId(id) });
    if (!r) {
        return (0, responseWrapper_1.default)(false, messages_enum_1.COMMON_MESSAGE.NotFoundWoParam, 404);
    }
    const fdStatus = ticket_2.EFdStatus.Closed;
    const fdPayload = {
        status: fdStatus,
    };
    const fdRes = yield (0, freshdesk_1.updateTicketService)(Number(r === null || r === void 0 ? void 0 : r.ticketFdId), fdPayload);
    if (!(fdRes === null || fdRes === void 0 ? void 0 : fdRes.success)) {
        return (0, responseWrapper_1.default)(false, messages_enum_1.COMMON_MESSAGE.Error, 400, null, fdRes === null || fdRes === void 0 ? void 0 : fdRes.error);
    }
    const providerId = r.providerId;
    const history = [
        ...((_g = r === null || r === void 0 ? void 0 : r.history) !== null && _g !== void 0 ? _g : []),
        {
            statusFrom: r === null || r === void 0 ? void 0 : r.status,
            statusTo: status,
            updatedBy: user._id,
            updatedAt: new Date(),
            remark: '',
        },
    ];
    r.history = history;
    r.status = status;
    yield r.save();
    const ticket = yield ticket_1.default.findById(r.ticketDbId);
    const ticketHistory = [
        ...((_h = ticket === null || ticket === void 0 ? void 0 : ticket.history) !== null && _h !== void 0 ? _h : []),
        {
            statusFrom: ticket.statusId,
            statusTo: fdStatus,
            updatedBy: user === null || user === void 0 ? void 0 : user._id,
            updatedAt: new Date(),
        },
    ];
    ticket.history = ticketHistory;
    ticket.statusId = fdStatus;
    ticket.closedBy = user._id;
    ticket.closedAt = new Date();
    yield ticket.save();
    if (status === delistRequest_1.EApprovalStatus.Rejected) {
        return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200);
    }
    const providerInsurers = yield providerInsurer_1.default.find({
        providerId,
        insurerId: { $in: [...r.activateForInsurerIds, r.deactivateForInsurerIds] },
        isDeleted: false,
    });
    const bulkOps = providerInsurers.map(rec => {
        var _a, _b;
        const changeStatusTo = (_a = r.activateForInsurerIds) === null || _a === void 0 ? void 0 : _a.includes(rec.insurerId);
        const history = [
            ...((_b = rec.history) !== null && _b !== void 0 ? _b : []),
            {
                statusFrom: rec.isActive,
                statusTo: changeStatusTo,
                updatedBy: r.createdBy,
                updatedAt: new Date(),
                remark: '',
            },
        ];
        return {
            updateOne: {
                filter: { _id: rec._id },
                update: {
                    $set: { isActive: changeStatusTo, history },
                },
            },
        };
    });
    yield providerInsurer_1.default.bulkWrite(bulkOps);
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200);
}));
