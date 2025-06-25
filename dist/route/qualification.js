"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const qualification_1 = require("../controller/qualification");
const route_enums_1 = require("../utils/route.enums");
const qualificationRoute = express_1.default.Router();
qualificationRoute.post(route_enums_1.QUALIFICATION_ROUTE.dropdown, qualification_1.qualificationDdCtl);
exports.default = qualificationRoute;
