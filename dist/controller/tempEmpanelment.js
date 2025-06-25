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
exports.empanelProviderCtl = exports.tempEmpanelForLegalCtl = exports.editTempEmpanelByNwCtl = exports.editTempEmpanelByDcCtl = exports.proceedDocusignCtl = exports.getOneTempEmpanelCtl = exports.changeStatusByLegalCtl = exports.changeStatusByNwCtl = exports.dcVerificationCountCtl = exports.tempEmpanelByStatusCtl = exports.createSelfTempEmpanelmentCtl = exports.createManualTempEmpanelmentCtl = void 0;
const tempEmpanelment_1 = require("../services/tempEmpanelment");
const createManualTempEmpanelmentCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, tempEmpanelment_1.createManualTempEmpanelmentService)(req, res, next);
    return res.json(result);
});
exports.createManualTempEmpanelmentCtl = createManualTempEmpanelmentCtl;
const createSelfTempEmpanelmentCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, tempEmpanelment_1.createSelfTempEmpanelmentService)(req, res, next);
    return res.json(result);
});
exports.createSelfTempEmpanelmentCtl = createSelfTempEmpanelmentCtl;
const tempEmpanelByStatusCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, tempEmpanelment_1.tempEmpanelByStatusService)(req, res, next);
    return res.json(result);
});
exports.tempEmpanelByStatusCtl = tempEmpanelByStatusCtl;
const dcVerificationCountCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, tempEmpanelment_1.dcVerificationCountService)(req, res, next);
    return res.json(result);
});
exports.dcVerificationCountCtl = dcVerificationCountCtl;
const changeStatusByNwCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, tempEmpanelment_1.changeStatusByNw)(req, res, next);
    return res.json(result);
});
exports.changeStatusByNwCtl = changeStatusByNwCtl;
const changeStatusByLegalCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, tempEmpanelment_1.changeStatusByLegal)(req, res, next);
    return res.json(result);
});
exports.changeStatusByLegalCtl = changeStatusByLegalCtl;
const getOneTempEmpanelCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, tempEmpanelment_1.getOneTempEmpanelService)(req, res, next);
    return res.json(result);
});
exports.getOneTempEmpanelCtl = getOneTempEmpanelCtl;
const proceedDocusignCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, tempEmpanelment_1.proceedDocusignService)(req, res, next);
    return res.json(result);
});
exports.proceedDocusignCtl = proceedDocusignCtl;
const editTempEmpanelByDcCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, tempEmpanelment_1.editTempEmpanelByDcService)(req, res, next);
    return res.json(result);
});
exports.editTempEmpanelByDcCtl = editTempEmpanelByDcCtl;
const editTempEmpanelByNwCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, tempEmpanelment_1.editTempEmpanelByNw)(req, res, next);
    return res.json(result);
});
exports.editTempEmpanelByNwCtl = editTempEmpanelByNwCtl;
const tempEmpanelForLegalCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, tempEmpanelment_1.tempEmpanelForLegalService)(req, res, next);
    return res.json(result);
});
exports.tempEmpanelForLegalCtl = tempEmpanelForLegalCtl;
const empanelProviderCtl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, tempEmpanelment_1.empanelProviderService)(req, res, next);
    return res.json(result);
});
exports.empanelProviderCtl = empanelProviderCtl;
