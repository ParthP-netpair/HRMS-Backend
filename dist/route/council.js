"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const council_1 = require("../controller/council");
const route_enums_1 = require("../utils/route.enums");
const councilRoute = express_1.default.Router();
councilRoute.post(route_enums_1.COUNCIL_ROUTE.dropdown, council_1.councilDdCtl);
exports.default = councilRoute;
