"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../utils/constants");
const TempProspectiveProviderSchema = new mongoose_1.Schema(Object.assign({ pincodeId: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.Pincode }, pincode: { type: String }, email: { type: String }, contactNo: { type: String }, providerName: { type: String }, zone: { type: String }, contactPersonName: { type: String }, parentDbId: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.Ticket }, parentFdId: { type: String } }, constants_1.commonDbFields), constants_1.schemaOptions);
const TempProspectiveProvider = (0, mongoose_1.model)('TempProspectiveProvider', TempProspectiveProviderSchema, constants_1.COLLECTIONS.TempProspectiveProvider);
exports.default = TempProspectiveProvider;
