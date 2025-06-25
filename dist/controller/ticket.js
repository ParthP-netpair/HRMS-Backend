"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicketDetailsCtl = exports.listClosedReqCtl = exports.listNewReqCtl = exports.createEmpanelTicketCtl = void 0;
const ticket_1 = require("../services/ticket");
const createEmpanelTicketCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, ticket_1.createEmpanelTicketService)(req, res, next);
    return res.json(result);
});
exports.createEmpanelTicketCtl = createEmpanelTicketCtl;
const listNewReqCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, ticket_1.listNewReqService)(req, res, next);
    return res.json(result);
});
exports.listNewReqCtl = listNewReqCtl;
const listClosedReqCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, ticket_1.listClosedReqService)(req, res, next);
    return res.json(result);
});
exports.listClosedReqCtl = listClosedReqCtl;
const getTicketDetailsCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, ticket_1.getTicketDetailsService)(req, res, next);
    return res.json(result);
});
exports.getTicketDetailsCtl = getTicketDetailsCtl;
