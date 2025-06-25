"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../utils/constants");
const ProviderStaffSchema = new mongoose_1.Schema(Object.assign({ providerId: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.Provider }, staffType: String, name: String, gender: String, qualificationId: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.Qualification }, otherQualification: String, registrationNo: String, councilId: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.Council }, otherCouncil: String, isAvailable: Boolean }, constants_1.commonDbFields), constants_1.schemaOptions);
const ProviderStaff = (0, mongoose_1.model)('ProviderStaff', ProviderStaffSchema, constants_1.COLLECTIONS.ProviderStaff);
exports.default = ProviderStaff;
