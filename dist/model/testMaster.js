"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../utils/constants");
const TestMasterSchema = new mongoose_1.Schema(Object.assign({ name: String, displayName: String, description: String, code: String, loincCode: String, shortName: String, categoryId: { type: mongoose_1.Schema.Types.ObjectId, ref: constants_1.COLLECTIONS.TestCategory } }, constants_1.commonDbFields), constants_1.schemaOptions);
const TestMaster = (0, mongoose_1.model)('TestMaster', TestMasterSchema, constants_1.COLLECTIONS.TestMaster);
exports.default = TestMaster;
