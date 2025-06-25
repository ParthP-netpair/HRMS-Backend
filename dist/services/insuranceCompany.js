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
exports.insuranceCompanyDdService = void 0;
const responseWrapper_1 = __importDefault(require("../helpers/responseWrapper"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const insuranceCompany_1 = __importDefault(require("../model/insuranceCompany"));
const messages_enum_1 = require("../utils/messages.enum");
exports.insuranceCompanyDdService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const records = yield insuranceCompany_1.default.find({ isActive: true, isDeleted: false });
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, records);
}));
