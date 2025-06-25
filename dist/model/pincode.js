"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidation = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../utils/constants");
const zod_1 = __importDefault(require("zod"));
const PincodeSchema = new mongoose_1.Schema(Object.assign({ pincode: { type: String, unique: true }, city: String, state: String, block: String, country: String, zone: String }, constants_1.commonDbFields), constants_1.schemaOptions);
const Pincode = (0, mongoose_1.model)('Pincode', PincodeSchema, constants_1.COLLECTIONS.Pincode);
exports.default = Pincode;
exports.schemaValidation = zod_1.default.object({
    pincode: zod_1.default.string(),
    city: zod_1.default.string().optional(),
    state: zod_1.default.string().optional(),
    block: zod_1.default.string().optional(),
    zone: zod_1.default.string().optional(),
});
