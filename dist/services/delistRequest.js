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
exports.changeDelistReqStatusService = exports.delistProviderByNwService = exports.createProviderDelistTicketService = void 0;
const mongoose_1 = require("mongoose");
const responseWrapper_1 = __importDefault(require("../helpers/responseWrapper"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const delistRequest_1 = __importDefault(require("../model/delistRequest"));
const provider_1 = __importDefault(require("../model/provider"));
const ticket_1 = __importDefault(require("../model/ticket"));
const ticket_2 = require("../types/ticket");
const messages_enum_1 = require("../utils/messages.enum");
const freshdesk_1 = require("./freshdesk");
const json_stable_stringify_1 = __importDefault(require("json-stable-stringify"));
const delistRequest_2 = require("../types/delistRequest");
const providerInsurer_1 = __importDefault(require("../model/providerInsurer"));
const { ObjectId } = mongoose_1.Types;
exports.createProviderDelistTicketService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const user = (_a = req === null || req === void 0 ? void 0 : req.token) === null || _a === void 0 ? void 0 : _a.user;
    const { id } = req.body;
    const provider = yield provider_1.default.findById(id);
    const status = ticket_2.EFdStatus.Open;
    const priority = ticket_2.EFdPriority.Low;
    const request_type = ticket_2.ERequestType.Delist;
    const zone = provider === null || provider === void 0 ? void 0 : provider.zone;
    const remark = '';
    const fdPayload = {
        status,
        priority,
        subject: 'DC Delist request',
        email: user === null || user === void 0 ? void 0 : user.email,
        description: req.body.remark,
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
    const ticket = (_b = fdRes === null || fdRes === void 0 ? void 0 : fdRes.response) === null || _b === void 0 ? void 0 : _b.data;
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
    yield delistRequest_1.default.create({
        providerId: id,
        createdBy: user._id,
        ticketDbId: t._id,
        ticketFdId: t.ticketId,
    });
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 201);
}));
exports.delistProviderByNwService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const user = (_c = req === null || req === void 0 ? void 0 : req.token) === null || _c === void 0 ? void 0 : _c.user;
    const { id } = req.body;
    yield provider_1.default.findByIdAndUpdate(id, {
        $set: { isDelist: true, delistBy: user._id, updatedBy: user._id },
    });
    yield delistRequest_1.default.create({
        providerId: id,
        status: delistRequest_2.EApprovalStatus.Approved,
        createdBy: user._id,
    });
    yield providerInsurer_1.default.updateMany({ providerId: new ObjectId(id) }, { $set: { isActive: false } });
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200);
}));
exports.changeDelistReqStatusService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    const user = (_d = req === null || req === void 0 ? void 0 : req.token) === null || _d === void 0 ? void 0 : _d.user;
    const { id, status } = req.body;
    const r = yield delistRequest_1.default.findOne({ ticketDbId: new ObjectId(id) });
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
    const ticket = yield ticket_1.default.findById(r === null || r === void 0 ? void 0 : r.ticketDbId);
    const ticketHistory = [
        ...((_e = ticket === null || ticket === void 0 ? void 0 : ticket.history) !== null && _e !== void 0 ? _e : []),
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
    const providerId = r.providerId;
    const history = [
        ...((_f = r === null || r === void 0 ? void 0 : r.history) !== null && _f !== void 0 ? _f : []),
        {
            statusFrom: r === null || r === void 0 ? void 0 : r.status,
            statusTo: status,
            updatedBy: user._id,
            updatedAt: new Date(),
            remark: '',
        },
    ];
    if (status === delistRequest_2.EApprovalStatus.Approved) {
        yield provider_1.default.findByIdAndUpdate(providerId, {
            $set: { isDelist: true, delistBy: r.createdBy, updatedBy: user._id },
        });
        yield providerInsurer_1.default.updateMany({ providerId: new ObjectId(providerId) }, { $set: { isActive: false } });
    }
    r.history = history;
    r.status = status;
    yield r.save();
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200);
}));
