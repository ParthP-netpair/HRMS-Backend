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
exports.verifyBankFrsCtl = exports.verifyPanFrsCtl = exports.verifyCompanyCtl = exports.verifyBankCtl = exports.verifyPanCtl = exports.verifyAadharCtl = void 0;
const externalVerification_1 = require("../services/externalVerification");
const verifyAadharCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, externalVerification_1.verifyAadharService)(req, res, next);
    return res.json(result);
});
exports.verifyAadharCtl = verifyAadharCtl;
const verifyPanCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, externalVerification_1.verifyPanService)(req, res, next);
    return res.json(result);
});
exports.verifyPanCtl = verifyPanCtl;
const verifyBankCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, externalVerification_1.verifyBankService)(req, res, next);
    return res.json(result);
});
exports.verifyBankCtl = verifyBankCtl;
const verifyCompanyCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, externalVerification_1.verifyCompanyService)(req, res, next);
    return res.json(result);
});
exports.verifyCompanyCtl = verifyCompanyCtl;
const verifyPanFrsCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, externalVerification_1.verifyPanFrsService)(req, res, next);
    return res.json(result);
});
exports.verifyPanFrsCtl = verifyPanFrsCtl;
const verifyBankFrsCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, externalVerification_1.verifyBankFrsService)(req, res, next);
    return res.json(result);
});
exports.verifyBankFrsCtl = verifyBankFrsCtl;
