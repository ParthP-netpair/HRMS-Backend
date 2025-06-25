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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserService = void 0;
const moment_1 = __importDefault(require("moment"));
const env_config_1 = __importDefault(require("../config/env.config"));
const jwt_bcrypt_1 = require("../helpers/jwt-bcrypt");
const responseWrapper_1 = __importDefault(require("../helpers/responseWrapper"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const user_1 = __importDefault(require("../model/user"));
const messages_enum_1 = require("../utils/messages.enum");
exports.createUserService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const exist = yield user_1.default.findOne({ email: (_a = req.body) === null || _a === void 0 ? void 0 : _a.email, isDeleted: false });
    if (exist) {
        const msg = messages_enum_1.COMMON_MESSAGE.AlreadyExist.replace(`{param}`, 'Email');
        return (0, responseWrapper_1.default)(false, msg, 400);
    }
    const hash = yield (0, jwt_bcrypt_1.hashPassword)((_b = req.body) === null || _b === void 0 ? void 0 : _b.password);
    req.body.password = hash;
    const expiresInMonths = Number((0, env_config_1.default)('PASSWORD_EXPIRY_MONTHS'));
    req.body.passwordExpireAt = (0, moment_1.default)().add(expiresInMonths, 'months').toDate();
    const user = yield user_1.default.create(req.body);
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 201, user);
}));
