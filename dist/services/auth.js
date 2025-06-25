"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordService = exports.forgotPasswordService = exports.currentUserService = exports.loginService = void 0;
const moment_1 = __importDefault(require("moment"));
const env_config_1 = __importDefault(require("../config/env.config"));
const jwt_bcrypt_1 = require("../helpers/jwt-bcrypt");
const responseWrapper_1 = __importDefault(require("../helpers/responseWrapper"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const user_1 = __importDefault(require("../model/user"));
const messages_enum_1 = require("../utils/messages.enum");
const encrypt_1 = require("../helpers/encrypt");
const mail_config_1 = __importDefault(require("../config/mail.config"));
const resetPassword_1 = __importDefault(require("../template/resetPassword"));
exports.loginService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = yield user_1.default.findOne({ email: data === null || data === void 0 ? void 0 : data.email, isActive: true, isDeleted: false });
    if (!user) {
        const msg = messages_enum_1.COMMON_MESSAGE.NotFound.replace(`{param}`, 'User');
        return (0, responseWrapper_1.default)(false, msg, 400);
    }
    const passwordMatch = yield (0, jwt_bcrypt_1.comparePassword)(data === null || data === void 0 ? void 0 : data.password, user === null || user === void 0 ? void 0 : user.password);
    if (!passwordMatch) {
        const msg = messages_enum_1.COMMON_MESSAGE.InvalidPassword;
        return (0, responseWrapper_1.default)(false, msg, 400);
    }
    const _a = user.toJSON(), { password } = _a, rest = __rest(_a, ["password"]);
    const token = (0, jwt_bcrypt_1.signJwt)(rest, data === null || data === void 0 ? void 0 : data.rememberMe);
    user.lastLoginAt = new Date();
    yield user.save();
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, { token, role: rest === null || rest === void 0 ? void 0 : rest.role });
}));
exports.currentUserService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const decodedToken = (_b = req.token) === null || _b === void 0 ? void 0 : _b.user;
    const user = (_c = (yield user_1.default.findById(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id))) === null || _c === void 0 ? void 0 : _c.toJSON();
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, { user });
}));
exports.forgotPasswordService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = yield user_1.default.findOne({ email: data === null || data === void 0 ? void 0 : data.email, isActive: true, isDeleted: false });
    if (!user) {
        const msg = messages_enum_1.COMMON_MESSAGE.NotFound.replace(`{param}`, 'User');
        return (0, responseWrapper_1.default)(false, msg, 400);
    }
    const resetPasswordToken = (0, encrypt_1.generateRandomToken)();
    if (!resetPasswordToken)
        return (0, responseWrapper_1.default)(false, messages_enum_1.COMMON_MESSAGE.Error, 400);
    const url = `${(0, env_config_1.default)('FRONTEND_URL')}/reset-password?token=${resetPasswordToken}`;
    const expiryMinutes = Number((0, env_config_1.default)('RESET_PASSWORD_EXPIRY_MINUTES'));
    const { subject, template } = (0, resetPassword_1.default)({
        Name: user.name,
        ExpirationTime: String(expiryMinutes),
        ResetLink: url,
    });
    yield (0, mail_config_1.default)({
        template,
        toMail: user.email,
        subject,
    });
    user.resetPasswordExpireAt = (0, moment_1.default)().add(expiryMinutes, 'minutes').toDate();
    user.resetPasswordToken = resetPasswordToken;
    yield user.save();
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, { url });
}));
exports.changePasswordService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = yield user_1.default.findOne({ resetPasswordToken: data === null || data === void 0 ? void 0 : data.token });
    if (!user)
        return (0, responseWrapper_1.default)(false, messages_enum_1.COMMON_MESSAGE.InvalidToken, 400);
    const resetPasswordExpireAt = (0, moment_1.default)(user === null || user === void 0 ? void 0 : user.resetPasswordExpireAt);
    const isExpired = (0, moment_1.default)().isAfter(resetPasswordExpireAt);
    if (isExpired)
        return (0, responseWrapper_1.default)(false, messages_enum_1.COMMON_MESSAGE.TokenExpired, 400);
    user.password = yield (0, jwt_bcrypt_1.hashPassword)(data === null || data === void 0 ? void 0 : data.password);
    const expiresInMonths = Number((0, env_config_1.default)('PASSWORD_EXPIRY_MONTHS'));
    user.passwordExpireAt = (0, moment_1.default)().add(expiresInMonths, 'months').toDate();
    user.resetPasswordExpireAt = null;
    user.resetPasswordToken = null;
    yield user.save();
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200);
}));
