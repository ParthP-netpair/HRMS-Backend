"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testCategory_1 = require("../controller/testCategory");
const route_enums_1 = require("../utils/route.enums");
const testCategoryRoute = express_1.default.Router();
testCategoryRoute.post(route_enums_1.TEST_CATEGORY_ROUTE.dropdown, testCategory_1.testCategoryDdCtl);
exports.default = testCategoryRoute;
