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
const TicketSchema = new mongoose_1.Schema(Object.assign({ ticketId: String, fdResponse: mongoose_1.Schema.Types.Mixed, priorityId: Number, statusId: Number, sourceId: Number, groupId: Number, dueBy: Date, requestType: String, pincodeId: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.Pincode }, pincode: { type: String }, zone: { type: String }, remark: { type: String }, providerId: { type: mongoose_1.Schema.Types.ObjectId }, activateForInsurerIds: { type: [mongoose_1.Schema.Types.ObjectId] }, deactivateForInsurerIds: { type: [mongoose_1.Schema.Types.ObjectId] }, history: {
        type: [
            {
                statusFrom: Number,
                statusTo: Number,
                updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.User },
                updatedAt: Date,
            },
        ],
    }, closedAt: Date, closedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.User } }, constants_1.commonDbFields), constants_1.schemaOptions);
const Ticket = (0, mongoose_1.model)('Ticket', TicketSchema, constants_1.COLLECTIONS.Ticket);
exports.default = Ticket;
exports.schemaValidation = zod_1.default.object({
    pincode: zod_1.default.string(),
    zone: zod_1.default.nativeEnum(user_1.EZones),
    remark: zod_1.default.string(),
    activateForInsurerIds: zod_1.default.array(zod_1.default.string()).optional(),
    deactivateForInsurerIds: zod_1.default.array(zod_1.default.string()).optional(),
    pincodeData: zod_1.default.object({
        city: zod_1.default.string().optional(),
        state: zod_1.default.string().optional(),
        block: zod_1.default.string().optional(),
        country: zod_1.default.string().optional(),
    }),
});
