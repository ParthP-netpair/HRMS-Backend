"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../utils/constants");
const delistRequest_1 = require("../types/delistRequest");
const ProviderInsurerRequestSchema = new mongoose_1.Schema(Object.assign({ providerId: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.Provider }, status: { type: String, default: delistRequest_1.EApprovalStatus.Pending }, ticketFdId: String, ticketDbId: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.Ticket }, activateForInsurerIds: { type: [mongoose_1.Schema.Types.ObjectId], ref: constants_1.COLLECTIONS.InsuranceCompany }, deactivateForInsurerIds: { type: [mongoose_1.Schema.Types.ObjectId], ref: constants_1.COLLECTIONS.InsuranceCompany }, history: [
        {
            statusFrom: String,
            statusTo: String,
            updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.User },
            updatedAt: Date,
            remark: String,
        },
    ] }, constants_1.commonDbFields), constants_1.schemaOptions);
const ProviderInsurerRequest = (0, mongoose_1.model)('ProviderInsurerRequest', ProviderInsurerRequestSchema, constants_1.COLLECTIONS.ProviderInsurerRequest);
exports.default = ProviderInsurerRequest;
