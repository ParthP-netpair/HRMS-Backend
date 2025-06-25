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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = __importDefault(require("../config/env.config"));
const responseWrapper_1 = __importDefault(require("../helpers/responseWrapper"));
const messages_enum_1 = require("../utils/messages.enum");
const logger_1 = __importDefault(require("../helpers/logger"));
const secret = (0, env_config_1.default)('JWT_SECRET');
const response = (0, responseWrapper_1.default)(false, messages_enum_1.COMMON_MESSAGE.Unauthorized, 401, null, null);
const authMw = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token)
            return res.json(response);
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.token = decoded;
        res.status(200);
        return next();
    }
    catch (err) {
        if (err && (err === null || err === void 0 ? void 0 : err.name) === 'TokenExpiredError') {
            return res.json(Object.assign(Object.assign({}, response), { error: err, message: messages_enum_1.COMMON_MESSAGE.SessionExpired }));
        }
        logger_1.default.error('Error in authMw: ' + (err === null || err === void 0 ? void 0 : err.message), { data: err, log: 'error' });
        return res.json(Object.assign(Object.assign({}, response), { message: err === null || err === void 0 ? void 0 : err.message, error: err }));
    }
});
exports.default = authMw;
