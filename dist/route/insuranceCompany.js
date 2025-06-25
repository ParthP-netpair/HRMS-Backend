"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const insuranceCompany_1 = require("../controller/insuranceCompany");
const route_enums_1 = require("../utils/route.enums");
const auth_1 = __importDefault(require("../middleware/auth"));
const insuranceCompanyRoute = express_1.default.Router();
insuranceCompanyRoute.post(route_enums_1.INSURANCE_COMPANY_ROUTE.dropdown, auth_1.default, insuranceCompany_1.insuranceCompanyDdCtl);
exports.default = insuranceCompanyRoute;
