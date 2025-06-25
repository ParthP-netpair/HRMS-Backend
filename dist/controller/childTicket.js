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
exports.prospectiveProviderDetailsCtl = exports.listOpenChildReqCtl = exports.getProspectiveProviderCtl = exports.deleteProspectiveProviderCtl = exports.addProspectiveProviderCtl = exports.createProspectiveProviderCtl = void 0;
const childTicket_1 = require("../services/childTicket");
const createProspectiveProviderCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, childTicket_1.createProspectiveProviderService)(req, res, next);
    return res.json(result);
});
exports.createProspectiveProviderCtl = createProspectiveProviderCtl;
const addProspectiveProviderCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, childTicket_1.addProspectiveProviderService)(req, res, next);
    return res.json(result);
});
exports.addProspectiveProviderCtl = addProspectiveProviderCtl;
const deleteProspectiveProviderCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, childTicket_1.deleteProspectiveProviderService)(req, res, next);
    return res.json(result);
});
exports.deleteProspectiveProviderCtl = deleteProspectiveProviderCtl;
const getProspectiveProviderCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, childTicket_1.getProspectiveProviderService)(req, res, next);
    return res.json(result);
});
exports.getProspectiveProviderCtl = getProspectiveProviderCtl;
const listOpenChildReqCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, childTicket_1.listOpenChildReqService)(req, res, next);
    return res.json(result);
});
exports.listOpenChildReqCtl = listOpenChildReqCtl;
const prospectiveProviderDetailsCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, childTicket_1.prospectiveProviderDetailsService)(req, res, next);
    return res.json(result);
});
exports.prospectiveProviderDetailsCtl = prospectiveProviderDetailsCtl;
