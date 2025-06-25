"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidation = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../utils/constants");
const zod_1 = __importDefault(require("zod"));
const user_1 = require("../types/user");
const ChildTicketSchema = new mongoose_1.Schema(Object.assign({ ticketId: String, fdResponse: mongoose_1.Schema.Types.Mixed, priorityId: Number, statusId: Number, sourceId: Number, groupId: Number, dueBy: Date, requestType: String, pincodeId: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.Pincode }, pincode: { type: String }, email: { type: String }, contactNo: { type: String }, empanelType: { type: String }, fdAssociationType: { type: Number }, providerName: { type: String }, zone: { type: String }, contactPersonName: { type: String }, parentDbId: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.Ticket }, tempProspectiveProviderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: constants_1.COLLECTIONS.TempProspectiveProvider,
    }, parentFdId: { type: String }, history: {
        type: [
            {
                statusFrom: Number,
                statusTo: Number,
                updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.User },
                updatedAt: Date,
            },
        ],
    }, closedAt: Date, closedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.User } }, constants_1.commonDbFields), constants_1.schemaOptions);
const ChildTicket = (0, mongoose_1.model)('ChildTicket', ChildTicketSchema, constants_1.COLLECTIONS.ChildTicket);
exports.default = ChildTicket;
exports.schemaValidation = zod_1.default.object({
    pincode: zod_1.default.string(),
    contactPersonName: zod_1.default.string(),
    providerName: zod_1.default.string(),
    email: zod_1.default.string().email(),
    zone: zod_1.default.nativeEnum(user_1.EZones),
    contactNo: zod_1.default.string(),
    parentDbId: zod_1.default.string(),
});
