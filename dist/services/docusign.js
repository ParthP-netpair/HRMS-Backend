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
exports.downloadEnvelopeDoc = exports.checkEnvelopeStatus = exports.createDocusignEnvelope = void 0;
const mongoose_1 = require("mongoose");
const docusign_1 = __importStar(require("../docusign"));
const getEnvelopeHistory_1 = __importDefault(require("../docusign/getEnvelopeHistory"));
const responseWrapper_1 = __importDefault(require("../helpers/responseWrapper"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const tempEmpanelment_1 = __importDefault(require("../model/tempEmpanelment"));
const ticket_1 = __importDefault(require("../model/ticket"));
const ticket_2 = require("../types/ticket");
const messages_enum_1 = require("../utils/messages.enum");
const freshdesk_1 = require("./freshdesk");
const tempEmpanelment_2 = require("../types/tempEmpanelment");
const childTicket_1 = __importDefault(require("../model/childTicket"));
const providerStaff_1 = __importDefault(require("../model/providerStaff"));
const providerLabTest_1 = __importDefault(require("../model/providerLabTest"));
const providerInsurer_1 = __importDefault(require("../model/providerInsurer"));
const insuranceCompany_1 = __importDefault(require("../model/insuranceCompany"));
const provider_1 = __importDefault(require("../model/provider"));
const downloadDoc_1 = __importDefault(require("../docusign/downloadDoc"));
exports.createDocusignEnvelope = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, docusign_1.default)({
        signers: [
            {
                signerEmail: 'dishank.patel@alineahealthcare.in',
                signerName: 'Dishank',
            },
        ],
        tempEmpanelId: '66c5c5e1cbb772afaddd1472',
    });
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, result);
}));
exports.checkEnvelopeStatus = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const envelopeId = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id;
    const user = (_b = req === null || req === void 0 ? void 0 : req.token) === null || _b === void 0 ? void 0 : _b.user;
    const result = yield (0, getEnvelopeHistory_1.default)(envelopeId);
    const temp = yield tempEmpanelment_1.default.findOne({
        'docusignDetails.envelopeId': envelopeId,
        isDeleted: false,
    });
    if (!temp) {
        return (0, responseWrapper_1.default)(false, messages_enum_1.COMMON_MESSAGE.Error, 400);
    }
    if (((_c = result === null || result === void 0 ? void 0 : result.envelope) === null || _c === void 0 ? void 0 : _c.envelopeStatus) === docusign_1.EDocusignStatus.completed) {
        const r = yield (0, freshdesk_1.updateTicketService)(Number(temp === null || temp === void 0 ? void 0 : temp.childTicketFdId), {
            status: ticket_2.EFdStatus.DocusignProcessCompleted,
        });
        if (!(r === null || r === void 0 ? void 0 : r.success)) {
            return (0, responseWrapper_1.default)(false, messages_enum_1.COMMON_MESSAGE.Error, 400, null, r === null || r === void 0 ? void 0 : r.error);
        }
        const ticket = yield childTicket_1.default.findById(temp.childTicketDbId);
        const ticketHistory = [
            ...((_d = ticket === null || ticket === void 0 ? void 0 : ticket.history) !== null && _d !== void 0 ? _d : []),
            {
                statusFrom: ticket.statusId,
                statusTo: ticket_2.EFdStatus.DocusignProcessCompleted,
                updatedBy: user === null || user === void 0 ? void 0 : user._id,
                updatedAt: new Date(),
            },
        ];
        ticket.history = ticketHistory;
        ticket.statusId = ticket_2.EFdStatus.DocusignProcessCompleted;
        yield ticket.save();
        const p = yield provider_1.default.create(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, temp.basicDetails), temp.contactDetails), temp.ownershipDetails), temp.bankDetails), { incrementalId: temp === null || temp === void 0 ? void 0 : temp.incrementalId, documents: temp === null || temp === void 0 ? void 0 : temp.documents }));
        const providerId = p._id;
        const tests = temp === null || temp === void 0 ? void 0 : temp.availableTestIds.map(testId => ({ testId, providerId }));
        const insurers = (_e = (yield insuranceCompany_1.default.find({ isActive: true, isDeleted: false }))) === null || _e === void 0 ? void 0 : _e.map(x => ({
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
                $nin: [
                    ticket_2.EFdStatus.Closed,
                    ticket_2.EFdStatus.EmpanelmentSuccessful,
                    ticket_2.EFdStatus.DocusignProcessCompleted,
                ],
            },
            isDeleted: false,
        });
        if (!pendingChildTickets) {
            const closed = ticket_2.EFdStatus.Closed;
            const r = yield (0, freshdesk_1.updateTicketService)(Number(temp === null || temp === void 0 ? void 0 : temp.parentTicketFdId), {
                status: closed,
            });
            yield ticket_1.default.findByIdAndUpdate(temp.parentTicketDbId, {
                $set: { statusId: closed, closedAt: new Date(), closedBy: user === null || user === void 0 ? void 0 : user._id },
            });
        }
        temp.empanelmentStatus = tempEmpanelment_2.EDCEmpanelmentStatus.Registered;
        temp.docusignDetails = result.envelope;
        yield temp.save();
    }
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, result);
}));
exports.downloadEnvelopeDoc = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    const envelopeId = (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.id;
    const user = (_g = req === null || req === void 0 ? void 0 : req.token) === null || _g === void 0 ? void 0 : _g.user;
    const documentBytes = yield (0, downloadDoc_1.default)(envelopeId);
    res.setHeader('Content-Disposition', `attachment; filename=document.pdf`);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(documentBytes);
}));
