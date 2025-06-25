"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../utils/constants");
const ExternalVerificationSchema = new mongoose_1.Schema(Object.assign({ name: String, payload: mongoose_1.Schema.Types.Mixed, response: mongoose_1.Schema.Types.Mixed, isVerified: Boolean }, constants_1.commonDbFields), constants_1.schemaOptions);
const ExternalVerification = (0, mongoose_1.model)('ExternalVerification', ExternalVerificationSchema, constants_1.COLLECTIONS.ExternalVerification);
exports.default = ExternalVerification;
