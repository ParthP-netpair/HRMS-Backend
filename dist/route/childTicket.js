"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const childTicket_1 = require("../controller/childTicket");
const schemaValidator_1 = __importDefault(require("../middleware/schemaValidator"));
const childTicket_2 = require("../model/childTicket");
const route_enums_1 = require("../utils/route.enums");
const auth_1 = __importDefault(require("../middleware/auth"));
const childTicketRoute = express_1.default.Router();
childTicketRoute.post(route_enums_1.PROSPECTIVE_PROVIDER_ROUTE.getDetails, childTicket_1.prospectiveProviderDetailsCtl);
childTicketRoute.post(route_enums_1.PROSPECTIVE_PROVIDER_ROUTE.create, auth_1.default, (0, schemaValidator_1.default)(childTicket_2.schemaValidation), childTicket_1.createProspectiveProviderCtl);
childTicketRoute.post(route_enums_1.PROSPECTIVE_PROVIDER_ROUTE.add, auth_1.default, childTicket_1.addProspectiveProviderCtl);
childTicketRoute.post(route_enums_1.PROSPECTIVE_PROVIDER_ROUTE.delete, auth_1.default, childTicket_1.deleteProspectiveProviderCtl);
childTicketRoute.post(route_enums_1.PROSPECTIVE_PROVIDER_ROUTE.get, auth_1.default, childTicket_1.getProspectiveProviderCtl);
childTicketRoute.post(route_enums_1.PROSPECTIVE_PROVIDER_ROUTE.list, auth_1.default, childTicket_1.listOpenChildReqCtl);
exports.default = childTicketRoute;
