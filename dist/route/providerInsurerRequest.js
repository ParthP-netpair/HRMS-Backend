"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const providerInsurerRequest_1 = require("../controller/providerInsurerRequest");
const route_enums_1 = require("../utils/route.enums");
const auth_1 = __importDefault(require("../middleware/auth"));
const providerInsurerRequestRoute = express_1.default.Router();
providerInsurerRequestRoute.post(route_enums_1.PROVIDER_INSURER_MANAGE_ROUTE.create, auth_1.default, providerInsurerRequest_1.providerInsurerManageTicketCtl);
providerInsurerRequestRoute.post(route_enums_1.PROVIDER_INSURER_MANAGE_ROUTE.changeStatus, auth_1.default, providerInsurerRequest_1.providerInsurerReqStatusCtl);
providerInsurerRequestRoute.post(route_enums_1.PROVIDER_INSURER_MANAGE_ROUTE.changeStatusNw, auth_1.default, providerInsurerRequest_1.providerInsurerManageByNwCtl);
exports.default = providerInsurerRequestRoute;
