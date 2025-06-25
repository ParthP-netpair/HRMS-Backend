"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const other_1 = require("../controller/other");
const route_enums_1 = require("../utils/route.enums");
const otherRoute = express_1.default.Router();
otherRoute.post(route_enums_1.OTHER_EXTERNAL_ROUTE.ifscSearch, other_1.searchIfscCtl);
otherRoute.post(route_enums_1.OTHER_EXTERNAL_ROUTE.pincodeSearch, other_1.searchPincodeCtl);
exports.default = otherRoute;
