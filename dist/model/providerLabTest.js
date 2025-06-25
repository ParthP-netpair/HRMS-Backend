"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../utils/constants");
const ProviderLabTestSchema = new mongoose_1.Schema(Object.assign({ providerId: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.Provider }, testId: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.TestMaster } }, constants_1.commonDbFields), constants_1.schemaOptions);
const ProviderLabTest = (0, mongoose_1.model)('ProviderLabTest', ProviderLabTestSchema, constants_1.COLLECTIONS.ProviderLabTest);
exports.default = ProviderLabTest;
