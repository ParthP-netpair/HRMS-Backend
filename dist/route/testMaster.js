"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testMaster_1 = require("../controller/testMaster");
const route_enums_1 = require("../utils/route.enums");
const testMasterRoute = express_1.default.Router();
testMasterRoute.post(route_enums_1.TEST_MASTER_ROUTE.list, testMaster_1.testMasterListCtl);
exports.default = testMasterRoute;
