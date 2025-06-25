"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../utils/constants");
const TestCategorySchema = new mongoose_1.Schema(Object.assign({ name: String, displayName: String, code: String, description: String, shortName: String }, constants_1.commonDbFields), constants_1.schemaOptions);
const TestCategory = (0, mongoose_1.model)('TestCategory', TestCategorySchema, constants_1.COLLECTIONS.TestCategory);
exports.default = TestCategory;
