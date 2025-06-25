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
exports.delistProviderByNwCtl = exports.createProviderDelistTicketCtl = exports.changeDelistReqStatusCtl = void 0;
const delistRequest_1 = require("../services/delistRequest");
const changeDelistReqStatusCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, delistRequest_1.changeDelistReqStatusService)(req, res, next);
    return res.json(result);
});
exports.changeDelistReqStatusCtl = changeDelistReqStatusCtl;
const createProviderDelistTicketCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, delistRequest_1.createProviderDelistTicketService)(req, res, next);
    return res.json(result);
});
exports.createProviderDelistTicketCtl = createProviderDelistTicketCtl;
const delistProviderByNwCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, delistRequest_1.delistProviderByNwService)(req, res, next);
    return res.json(result);
});
exports.delistProviderByNwCtl = delistProviderByNwCtl;
