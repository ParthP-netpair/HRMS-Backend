"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const delistRequest_1 = require("../controller/delistRequest");
const route_enums_1 = require("../utils/route.enums");
const auth_1 = __importDefault(require("../middleware/auth"));
const delistRequestRoute = express_1.default.Router();
delistRequestRoute.post(route_enums_1.DELIST_REQUEST_ROUTE.create, auth_1.default, delistRequest_1.createProviderDelistTicketCtl);
delistRequestRoute.post(route_enums_1.DELIST_REQUEST_ROUTE.changeStatus, auth_1.default, delistRequest_1.changeDelistReqStatusCtl);
delistRequestRoute.post(route_enums_1.DELIST_REQUEST_ROUTE.changeStatusNw, auth_1.default, delistRequest_1.delistProviderByNwCtl);
exports.default = delistRequestRoute;
