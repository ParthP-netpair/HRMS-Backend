"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const partialEmpanelment_1 = require("../controller/partialEmpanelment");
const route_enums_1 = require("../utils/route.enums");
const schemaValidator_1 = __importDefault(require("../middleware/schemaValidator"));
const partialEmpanelment_2 = require("../model/partialEmpanelment");
const partialEmpanelmentRoute = express_1.default.Router();
partialEmpanelmentRoute.post(route_enums_1.PARTIAL_EMPANELMENT_ROUTE.save, (0, schemaValidator_1.default)(partialEmpanelment_2.schemaValidation), partialEmpanelment_1.savePartialEmpanelmentCtl);
exports.default = partialEmpanelmentRoute;
