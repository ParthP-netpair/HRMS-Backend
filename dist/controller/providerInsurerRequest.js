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
exports.providerInsurerReqStatusCtl = exports.providerInsurerManageTicketCtl = exports.providerInsurerManageByNwCtl = void 0;
const providerInsurerRequest_1 = require("../services/providerInsurerRequest");
const providerInsurerManageByNwCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, providerInsurerRequest_1.providerInsurerManageByNwService)(req, res, next);
    return res.json(result);
});
exports.providerInsurerManageByNwCtl = providerInsurerManageByNwCtl;
const providerInsurerManageTicketCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, providerInsurerRequest_1.providerInsurerManageTicketService)(req, res, next);
    return res.json(result);
});
exports.providerInsurerManageTicketCtl = providerInsurerManageTicketCtl;
const providerInsurerReqStatusCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, providerInsurerRequest_1.providerInsurerReqStatusService)(req, res, next);
    return res.json(result);
});
exports.providerInsurerReqStatusCtl = providerInsurerReqStatusCtl;
