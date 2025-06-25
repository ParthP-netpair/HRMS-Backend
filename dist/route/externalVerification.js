"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const externalVerification_1 = require("../controller/externalVerification");
const route_enums_1 = require("../utils/route.enums");
const externalVerificationRoute = express_1.default.Router();
externalVerificationRoute.post(route_enums_1.EXTERNAL_VERIFICATION_ROUTE.verifyAadhar, externalVerification_1.verifyAadharCtl);
externalVerificationRoute.post(route_enums_1.EXTERNAL_VERIFICATION_ROUTE.verifyPan, externalVerification_1.verifyPanCtl);
externalVerificationRoute.post(route_enums_1.EXTERNAL_VERIFICATION_ROUTE.verifyBank, externalVerification_1.verifyBankCtl);
externalVerificationRoute.post(route_enums_1.EXTERNAL_VERIFICATION_ROUTE.verifyCompany, externalVerification_1.verifyCompanyCtl);
externalVerificationRoute.post(route_enums_1.EXTERNAL_VERIFICATION_ROUTE.verifyPanFrs, externalVerification_1.verifyPanFrsCtl);
externalVerificationRoute.post(route_enums_1.EXTERNAL_VERIFICATION_ROUTE.verifyBankFrs, externalVerification_1.verifyBankFrsCtl);
exports.default = externalVerificationRoute;
