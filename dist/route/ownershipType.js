"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ownershipType_1 = require("../controller/ownershipType");
const route_enums_1 = require("../utils/route.enums");
const ownershipTypeRoute = express_1.default.Router();
ownershipTypeRoute.post(route_enums_1.OWNERSHIP_TYPE_ROUTE.dropdown, ownershipType_1.ownershipTypeDdCtl);
exports.default = ownershipTypeRoute;
