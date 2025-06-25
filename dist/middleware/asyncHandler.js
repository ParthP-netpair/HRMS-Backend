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
const responseWrapper_1 = __importDefault(require("../helpers/responseWrapper"));
const messages_enum_1 = require("../utils/messages.enum");
const logger_1 = __importDefault(require("../helpers/logger"));
function asyncHandler(handler) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const r = yield handler(req, res, next);
            return r;
        }
        catch (error) {
            if (req === null || req === void 0 ? void 0 : req.mongoSession) {
                yield (req === null || req === void 0 ? void 0 : req.mongoSession.abortTransaction());
                yield (req === null || req === void 0 ? void 0 : req.mongoSession.endSession());
            }
            const data = { method: req.method, api: req.url, body: req.body, error };
            logger_1.default.error('error : ' + ((error === null || error === void 0 ? void 0 : error.message) || 'Unknown error!'), {
                data,
                log: 'error',
            });
            const e = {
                axiosResponse: (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data,
                message: error.message,
                error: {
                    stack: error === null || error === void 0 ? void 0 : error.stack,
                    status: error === null || error === void 0 ? void 0 : error.status,
                    code: error === null || error === void 0 ? void 0 : error.code,
                },
            };
            const re = (0, responseWrapper_1.default)(false, messages_enum_1.COMMON_MESSAGE.Error, 500, null, e);
            res.status(500);
            return re;
        }
    });
}
exports.default = asyncHandler;
