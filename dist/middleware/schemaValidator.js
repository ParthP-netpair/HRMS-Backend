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
const logger_1 = __importDefault(require("../helpers/logger"));
const schemaValidator = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const re = (0, responseWrapper_1.default)(false, 'Schema validation failed', 400, null, null);
    try {
        const valid = schema.safeParse(req.body);
        if ((valid === null || valid === void 0 ? void 0 : valid.success) === false) {
            const { errors } = valid.error;
            const { path, message } = errors[0];
            return res.json(Object.assign(Object.assign({}, re), { error: errors, message: `${path.join('.')}: ${message}` }));
        }
        req.body = valid.data;
        return next();
    }
    catch (error) {
        logger_1.default.error('Error in schemaValidator: ' + (error === null || error === void 0 ? void 0 : error.message), {
            data: error,
            log: 'error',
        });
        return res.json(Object.assign(Object.assign({}, re), { message: error.message || '', error }));
    }
});
exports.default = schemaValidator;
