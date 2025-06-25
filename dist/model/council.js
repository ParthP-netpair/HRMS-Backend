"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../utils/constants");
const CouncilSchema = new mongoose_1.Schema(Object.assign({ name: String, displayName: String }, constants_1.commonDbFields), constants_1.schemaOptions);
const Council = (0, mongoose_1.model)('Council', CouncilSchema, constants_1.COLLECTIONS.Council);
exports.default = Council;
