"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const provider_1 = require("../controller/provider");
const route_enums_1 = require("../utils/route.enums");
const auth_1 = __importDefault(require("../middleware/auth"));
const providerRoute = express_1.default.Router();
providerRoute.post(route_enums_1.PROVIDER_ROUTE.details, auth_1.default, provider_1.providerDetailsCtl);
providerRoute.post(route_enums_1.PROVIDER_ROUTE.mainSearch, auth_1.default, provider_1.mainSearchProviderCtl);
providerRoute.post(route_enums_1.PROVIDER_ROUTE.manageSearch, auth_1.default, provider_1.manageSearchProviderCtl);
providerRoute.post(route_enums_1.PROVIDER_ROUTE.manageDetails, auth_1.default, provider_1.providerDetailsForManageCt);
exports.default = providerRoute;
