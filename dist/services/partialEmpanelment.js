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
exports.savePartialEmpanelmentService = void 0;
const mongoose_1 = require("mongoose");
const responseWrapper_1 = __importDefault(require("../helpers/responseWrapper"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const partialEmpanelment_1 = __importDefault(require("../model/partialEmpanelment"));
const messages_enum_1 = require("../utils/messages.enum");
exports.savePartialEmpanelmentService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { tempProspectiveProviderId, empanelType } = req.body;
    const exist = yield partialEmpanelment_1.default.findOne({
        tempProspectiveProviderId: new mongoose_1.Types.ObjectId(tempProspectiveProviderId),
        isDeleted: false,
    });
    if (!exist) {
        const r = (_a = (yield partialEmpanelment_1.default.create(Object.assign(Object.assign({}, req.body), { tempProspectiveProviderId,
            empanelType })))) === null || _a === void 0 ? void 0 : _a.toJSON();
        return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 201, r);
    }
    const up = yield partialEmpanelment_1.default.findByIdAndUpdate(exist._id, {
        $set: Object.assign({}, req.body),
    });
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, up);
}));
