"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const responseWrapper_1 = __importDefault(require("./responseWrapper"));
function isObjectId(id) {
    const c = id.every(x => (0, mongoose_1.isValidObjectId)(x));
    if (!c)
        return (0, responseWrapper_1.default)(false, 'Mongoose_id_validation', 400);
}
exports.default = isObjectId;
