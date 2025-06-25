"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const delistRequest_1 = require("../types/delistRequest");
const constants_1 = require("../utils/constants");
const DelistRequestSchema = new mongoose_1.Schema(Object.assign({ providerId: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.Provider }, status: { type: String, default: delistRequest_1.EApprovalStatus.Pending }, ticketFdId: String, ticketDbId: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.Ticket }, history: [
        {
            statusFrom: String,
            statusTo: String,
            updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.User },
            updatedAt: Date,
            remark: String,
        },
    ] }, constants_1.commonDbFields), constants_1.schemaOptions);
const DelistRequest = (0, mongoose_1.model)('DelistRequest', DelistRequestSchema, constants_1.COLLECTIONS.DelistRequest);
exports.default = DelistRequest;
