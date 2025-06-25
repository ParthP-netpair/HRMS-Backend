"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticket_1 = require("../controller/ticket");
const schemaValidator_1 = __importDefault(require("../middleware/schemaValidator"));
const ticket_2 = require("../model/ticket");
const route_enums_1 = require("../utils/route.enums");
const auth_1 = __importDefault(require("../middleware/auth"));
const ticketRoute = express_1.default.Router();
ticketRoute.post(route_enums_1.TICKET_ROUTE.create, auth_1.default, (0, schemaValidator_1.default)(ticket_2.schemaValidation), ticket_1.createEmpanelTicketCtl);
ticketRoute.post(route_enums_1.TICKET_ROUTE.listNewReq, auth_1.default, ticket_1.listNewReqCtl);
ticketRoute.post(route_enums_1.TICKET_ROUTE.listClosedReq, auth_1.default, ticket_1.listClosedReqCtl);
ticketRoute.post(route_enums_1.TICKET_ROUTE.listClosedReq, auth_1.default, ticket_1.getTicketDetailsCtl);
exports.default = ticketRoute;
