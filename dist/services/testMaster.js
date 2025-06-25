"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.testMasterListService = void 0;
const mongoose_1 = require("mongoose");
const responseWrapper_1 = __importDefault(require("../helpers/responseWrapper"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const testMaster_1 = __importDefault(require("../model/testMaster"));
const messages_enum_1 = require("../utils/messages.enum");
const paginateResult_1 = __importStar(require("../helpers/paginateResult"));
const { ObjectId } = mongoose_1.Types;
exports.testMasterListService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, currentPage = 1, limitPerPage = 10, sortParam, sortOrder = -1, categoryId, } = req.body;
    const match = {
        isActive: true,
        isDeleted: false,
        categoryId: new ObjectId(categoryId),
    };
    if (search && search !== '') {
        const searchQuery = { $regex: search, $options: 'i' };
        match['$or'] = [{ name: searchQuery }, { code: searchQuery }, { loincCode: searchQuery }];
    }
    const skip = limitPerPage * currentPage - limitPerPage;
    const sort = sortParam || 'name';
    const records = yield testMaster_1.default.aggregate([
        { $match: match },
        { $sort: { [sort]: sortOrder } },
        ...(0, paginateResult_1.facetStage)(skip, limitPerPage),
    ]);
    const data = (0, paginateResult_1.default)(records, currentPage, limitPerPage);
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, data);
}));
