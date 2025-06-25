"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../utils/constants");
const InsuranceCompanySchema = new mongoose_1.Schema(Object.assign({ name: String, displayName: String }, constants_1.commonDbFields), constants_1.schemaOptions);
const InsuranceCompany = (0, mongoose_1.model)('InsuranceCompany', InsuranceCompanySchema, constants_1.COLLECTIONS.InsuranceCompany);
exports.default = InsuranceCompany;
