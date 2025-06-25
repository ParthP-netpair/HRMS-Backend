"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const docusign_1 = require("../controller/docusign");
const auth_1 = __importDefault(require("../middleware/auth"));
const route_enums_1 = require("../utils/route.enums");
const docusign_2 = require("../services/docusign");
const docusignRoute = express_1.default.Router();
docusignRoute.post(route_enums_1.DOCUSIGN_ROUTE.envelopeDetails, auth_1.default, docusign_1.checkEnvelopeStatusCtl);
docusignRoute.post(route_enums_1.DOCUSIGN_ROUTE.downloadDoc, auth_1.default, docusign_2.downloadEnvelopeDoc);
exports.default = docusignRoute;
