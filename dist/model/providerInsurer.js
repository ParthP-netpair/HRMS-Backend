"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../utils/constants");
const ProviderInsurerSchema = new mongoose_1.Schema(Object.assign({ providerId: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.Provider }, insurerId: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.InsuranceCompany }, history: [
        {
            statusFrom: Boolean,
            statusTo: Boolean,
            updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.User },
            updatedAt: Date,
            remark: String,
        },
    ] }, constants_1.commonDbFields), constants_1.schemaOptions);
const ProviderInsurer = (0, mongoose_1.model)('ProviderInsurer', ProviderInsurerSchema, constants_1.COLLECTIONS.ProviderInsurer);
exports.default = ProviderInsurer;
