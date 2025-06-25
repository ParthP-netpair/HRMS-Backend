"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidation = void 0;
const mongoose_1 = require("mongoose");
const user_1 = require("../types/user");
const constants_1 = require("../utils/constants");
const zod_1 = __importDefault(require("zod"));
const UserSchema = new mongoose_1.Schema(Object.assign({ name: String, contactNo: String, email: { type: String, set: (v) => v.toLowerCase() }, profilePhoto: String, password: String, role: String, defaultZone: String, accessibleZones: [String], lastLoginAt: {
        type: Date,
    }, passwordExpireAt: {
        type: Date,
    }, resetPasswordExpireAt: {
        type: Date,
    }, resetPasswordToken: String }, constants_1.commonDbFields), constants_1.schemaOptions);
const User = (0, mongoose_1.model)('User', UserSchema, constants_1.COLLECTIONS.User);
exports.default = User;
exports.schemaValidation = zod_1.default.object({
    name: zod_1.default.string(),
    contactNo: zod_1.default.string().optional(),
    email: zod_1.default.string(),
    profilePhoto: zod_1.default.string().optional(),
    password: zod_1.default.string(),
    role: zod_1.default.nativeEnum(user_1.EUserRole),
    defaultZone: zod_1.default.nativeEnum(user_1.EZones),
    accessibleZones: zod_1.default.array(zod_1.default.nativeEnum(user_1.EZones)),
});
