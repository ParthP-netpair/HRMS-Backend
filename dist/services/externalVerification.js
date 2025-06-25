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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyBankFrsService = exports.verifyPanFrsService = exports.verifyCompanyService = exports.verifyBankService = exports.verifyPanService = exports.verifyAadharService = void 0;
const responseWrapper_1 = __importDefault(require("../helpers/responseWrapper"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const messages_enum_1 = require("../utils/messages.enum");
const axiosRequest_1 = __importDefault(require("../helpers/axiosRequest"));
const env_config_1 = __importDefault(require("../config/env.config"));
const externalVerification_1 = __importDefault(require("../model/externalVerification"));
const externalVerification_2 = require("../types/externalVerification");
const constants_1 = require("../utils/constants");
const headers = {
    'X-API-Key': (0, env_config_1.default)('GRIDLINES_API_KEY'),
    'X-Auth-Type': 'API-Key',
    'Content-Type': 'application/json',
    Accept: 'application/json',
};
const username = (0, env_config_1.default)('FRS_ATLAS_USERNAME');
const password = (0, env_config_1.default)('FRS_ATLAS_PASSWORD');
const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
const frsHeaders = {
    Authorization: auth,
    'X-Auth-Type': 'API-Key',
    'Content-Type': 'application/json',
    Accept: 'application/json',
};
const baseUrl = (0, env_config_1.default)('GRIDLINES_API_URL');
const frsBaseUrl = (0, env_config_1.default)('FRS_ATLAS_URL');
const endpoints = {
    verifyAadhar: baseUrl + '/aadhaar-api/verify',
    verifyPan: baseUrl + '/pan-api/v2/verify',
    verifyBank: baseUrl + '/bank-api/verify',
    verifyCompany: baseUrl + '/mca-api/fetch-company',
};
var EAadharVerifyCode;
(function (EAadharVerifyCode) {
    EAadharVerifyCode["exist"] = "1018";
    EAadharVerifyCode["notExist"] = "1012";
})(EAadharVerifyCode || (EAadharVerifyCode = {}));
var EPanVerifyCode;
(function (EPanVerifyCode) {
    EPanVerifyCode["valid"] = "1001";
    EPanVerifyCode["partialMatch"] = "1002";
    EPanVerifyCode["invalid"] = "1003";
    EPanVerifyCode["notExist"] = "1004";
})(EPanVerifyCode || (EPanVerifyCode = {}));
var EBankVerifyCode;
(function (EBankVerifyCode) {
    EBankVerifyCode["valid"] = "1000";
    EBankVerifyCode["invalidAccNo"] = "1001";
    EBankVerifyCode["invalidIfsc"] = "1002";
    EBankVerifyCode["accBlocked"] = "1003";
    EBankVerifyCode["accClosed"] = "1004";
    EBankVerifyCode["cannotValidateSourceBank"] = "1006";
    EBankVerifyCode["cannotValidateImps"] = "1007";
    EBankVerifyCode["cannotValidateFailedAtBank"] = "1008";
    EBankVerifyCode["verificationFailed"] = "1009";
    EBankVerifyCode["beneficiaryOffline"] = "10010";
    EBankVerifyCode["npciUnavailable"] = "10011";
    EBankVerifyCode["invalidAccNREAcc"] = "10012";
})(EBankVerifyCode || (EBankVerifyCode = {}));
var ECompanyVerifyCode;
(function (ECompanyVerifyCode) {
    ECompanyVerifyCode["success"] = "1000";
    ECompanyVerifyCode["notExist"] = "1001";
})(ECompanyVerifyCode || (ECompanyVerifyCode = {}));
exports.verifyAadharService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const { aadhaar_number, consent = 'Y' } = req.body;
    const data = {
        aadhaar_number,
        consent,
    };
    const response = yield (0, axiosRequest_1.default)({
        method: 'post',
        url: endpoints.verifyAadhar,
        headers,
        data,
    });
    if (!(response === null || response === void 0 ? void 0 : response.success)) {
        const e = (_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.error) === null || _a === void 0 ? void 0 : _a.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error;
        const v = yield externalVerification_1.default.create({
            name: externalVerification_2.EExternalVerification.aadhar,
            payload: data,
            response: e,
            isVerified: false,
        });
        return (0, responseWrapper_1.default)(false, (_d = e === null || e === void 0 ? void 0 : e.message) !== null && _d !== void 0 ? _d : messages_enum_1.COMMON_MESSAGE.Error, 400, { verification: v === null || v === void 0 ? void 0 : v._id }, e);
    }
    const result = (_f = (_e = response === null || response === void 0 ? void 0 : response.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.data;
    if ((result === null || result === void 0 ? void 0 : result.code) === EAadharVerifyCode.exist) {
        const v = yield externalVerification_1.default.create({
            payload: data,
            response: result,
            isVerified: true,
            name: externalVerification_2.EExternalVerification.aadhar,
        });
        return (0, responseWrapper_1.default)(true, result === null || result === void 0 ? void 0 : result.message, 200, {
            result: result === null || result === void 0 ? void 0 : result.aadhaar_data,
            verification: v._id,
        });
    }
    if ((result === null || result === void 0 ? void 0 : result.code) === EAadharVerifyCode.notExist) {
        const v = yield externalVerification_1.default.create({
            payload: data,
            response: result,
            isVerified: false,
            name: externalVerification_2.EExternalVerification.aadhar,
        });
        return (0, responseWrapper_1.default)(true, result === null || result === void 0 ? void 0 : result.message, 400, {
            verification: v._id,
        }, { result: result === null || result === void 0 ? void 0 : result.aadhaar_data });
    }
    const v = yield externalVerification_1.default.create({
        payload: data,
        response: result,
        isVerified: false,
        name: externalVerification_2.EExternalVerification.aadhar,
    });
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Error, 400, null, result);
}));
exports.verifyPanService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j, _k, _l, _m;
    const { pan_id, name, date_of_birth, consent = 'Y' } = req.body;
    const data = {
        pan_id,
        name,
        date_of_birth,
        consent,
    };
    const response = yield (0, axiosRequest_1.default)({
        method: 'post',
        url: endpoints.verifyPan,
        headers,
        data,
    });
    if (!(response === null || response === void 0 ? void 0 : response.success)) {
        const e = (_j = (_h = (_g = response === null || response === void 0 ? void 0 : response.error) === null || _g === void 0 ? void 0 : _g.response) === null || _h === void 0 ? void 0 : _h.data) === null || _j === void 0 ? void 0 : _j.error;
        const v = yield externalVerification_1.default.create({
            name: externalVerification_2.EExternalVerification.pan,
            payload: data,
            response: e,
            isVerified: false,
        });
        return (0, responseWrapper_1.default)(false, (_k = e === null || e === void 0 ? void 0 : e.message) !== null && _k !== void 0 ? _k : messages_enum_1.COMMON_MESSAGE.Error, 400, { verification: v === null || v === void 0 ? void 0 : v._id }, e);
    }
    const result = (_m = (_l = response === null || response === void 0 ? void 0 : response.response) === null || _l === void 0 ? void 0 : _l.data) === null || _m === void 0 ? void 0 : _m.data;
    if ((result === null || result === void 0 ? void 0 : result.code) !== EPanVerifyCode.valid) {
        const v = yield externalVerification_1.default.create({
            payload: data,
            response: result,
            isVerified: false,
            name: externalVerification_2.EExternalVerification.pan,
        });
        return (0, responseWrapper_1.default)(true, result === null || result === void 0 ? void 0 : result.message, 400, {
            verification: v._id,
        }, result);
    }
    const v = yield externalVerification_1.default.create({
        payload: data,
        response: result,
        isVerified: true,
        name: externalVerification_2.EExternalVerification.pan,
    });
    return (0, responseWrapper_1.default)(true, result === null || result === void 0 ? void 0 : result.message, 200, {
        result: result,
        verification: v._id,
    });
}));
exports.verifyBankService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p, _q, _r, _s, _t;
    const { account_number, ifsc, consent = 'Y' } = req.body;
    const data = {
        ifsc,
        account_number,
        consent,
    };
    const response = yield (0, axiosRequest_1.default)({
        method: 'post',
        url: endpoints.verifyBank,
        headers,
        data,
    });
    if (!(response === null || response === void 0 ? void 0 : response.success)) {
        const e = (_q = (_p = (_o = response === null || response === void 0 ? void 0 : response.error) === null || _o === void 0 ? void 0 : _o.response) === null || _p === void 0 ? void 0 : _p.data) === null || _q === void 0 ? void 0 : _q.error;
        const v = yield externalVerification_1.default.create({
            name: externalVerification_2.EExternalVerification.bank,
            payload: data,
            response: e,
            isVerified: false,
        });
        return (0, responseWrapper_1.default)(false, (_r = e === null || e === void 0 ? void 0 : e.message) !== null && _r !== void 0 ? _r : messages_enum_1.COMMON_MESSAGE.Error, 400, { verification: v === null || v === void 0 ? void 0 : v._id }, e);
    }
    const result = (_t = (_s = response === null || response === void 0 ? void 0 : response.response) === null || _s === void 0 ? void 0 : _s.data) === null || _t === void 0 ? void 0 : _t.data;
    if ((result === null || result === void 0 ? void 0 : result.code) !== EBankVerifyCode.valid) {
        const v = yield externalVerification_1.default.create({
            payload: data,
            response: result,
            isVerified: false,
            name: externalVerification_2.EExternalVerification.bank,
        });
        return (0, responseWrapper_1.default)(true, result === null || result === void 0 ? void 0 : result.message, 400, {
            verification: v._id,
        }, result);
    }
    const v = yield externalVerification_1.default.create({
        payload: data,
        response: result,
        isVerified: true,
        name: externalVerification_2.EExternalVerification.bank,
    });
    return (0, responseWrapper_1.default)(true, result === null || result === void 0 ? void 0 : result.message, 200, {
        result: result,
        verification: v._id,
    });
}));
exports.verifyCompanyService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _u, _v, _w, _x, _y, _z;
    const { company_id, consent = 'Y' } = req.body;
    const data = {
        company_id,
        consent,
    };
    const response = yield (0, axiosRequest_1.default)({
        method: 'post',
        url: endpoints.verifyCompany,
        headers,
        data,
    });
    if (!(response === null || response === void 0 ? void 0 : response.success)) {
        const e = (_w = (_v = (_u = response === null || response === void 0 ? void 0 : response.error) === null || _u === void 0 ? void 0 : _u.response) === null || _v === void 0 ? void 0 : _v.data) === null || _w === void 0 ? void 0 : _w.error;
        const v = yield externalVerification_1.default.create({
            name: externalVerification_2.EExternalVerification.company,
            payload: data,
            response: e,
            isVerified: false,
        });
        return (0, responseWrapper_1.default)(false, (_x = e === null || e === void 0 ? void 0 : e.message) !== null && _x !== void 0 ? _x : messages_enum_1.COMMON_MESSAGE.Error, 400, { verification: v === null || v === void 0 ? void 0 : v._id }, e);
    }
    const result = (_z = (_y = response === null || response === void 0 ? void 0 : response.response) === null || _y === void 0 ? void 0 : _y.data) === null || _z === void 0 ? void 0 : _z.data;
    if ((result === null || result === void 0 ? void 0 : result.code) !== ECompanyVerifyCode.success) {
        const v = yield externalVerification_1.default.create({
            payload: data,
            response: result,
            isVerified: false,
            name: externalVerification_2.EExternalVerification.company,
        });
        return (0, responseWrapper_1.default)(true, result === null || result === void 0 ? void 0 : result.message, 400, {
            verification: v._id,
        }, result);
    }
    const v = yield externalVerification_1.default.create({
        payload: data,
        response: result,
        isVerified: true,
        name: externalVerification_2.EExternalVerification.company,
    });
    return (0, responseWrapper_1.default)(true, result === null || result === void 0 ? void 0 : result.message, 200, {
        result: result === null || result === void 0 ? void 0 : result.company_data,
        verification: v._id,
    });
}));
exports.verifyPanFrsService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _0, _1, _2, _3, _4, _5;
    const { pan_id, name, date_of_birth, consent = 'Y' } = req.body;
    const data = {
        pan_id,
        name,
        date_of_birth,
        consent,
    };
    const response = yield (0, axiosRequest_1.default)({
        method: 'post',
        url: `${frsBaseUrl}/verify/pan_basic?pan_number=${pan_id}&pan_name=${name}&dob=${date_of_birth}`,
        headers: frsHeaders,
    });
    if (!(response === null || response === void 0 ? void 0 : response.success)) {
        const e = (_2 = (_1 = (_0 = response === null || response === void 0 ? void 0 : response.error) === null || _0 === void 0 ? void 0 : _0.response) === null || _1 === void 0 ? void 0 : _1.data) === null || _2 === void 0 ? void 0 : _2.error;
        const v = yield externalVerification_1.default.create({
            name: externalVerification_2.EExternalVerification.pan,
            payload: data,
            response: e,
            isVerified: false,
        });
        return (0, responseWrapper_1.default)(false, (_3 = e === null || e === void 0 ? void 0 : e.message) !== null && _3 !== void 0 ? _3 : messages_enum_1.COMMON_MESSAGE.Error, 400, { verification: v === null || v === void 0 ? void 0 : v._id }, e);
    }
    const result = (_5 = (_4 = response === null || response === void 0 ? void 0 : response.response) === null || _4 === void 0 ? void 0 : _4.data) === null || _5 === void 0 ? void 0 : _5.data;
    if ((result === null || result === void 0 ? void 0 : result.pan_status) !== 'E') {
        const v = yield externalVerification_1.default.create({
            payload: data,
            response: result,
            isVerified: false,
            name: externalVerification_2.EExternalVerification.pan,
        });
        return (0, responseWrapper_1.default)(false, "Pan number doesn't exist", 400, {
            verification: v._id,
        }, result);
    }
    if ((result === null || result === void 0 ? void 0 : result.name_match) !== 'Y') {
        const v = yield externalVerification_1.default.create({
            payload: data,
            response: result,
            isVerified: false,
            name: externalVerification_2.EExternalVerification.pan,
        });
        return (0, responseWrapper_1.default)(false, "Name doesn't match with pan number.", 400, {
            verification: v._id,
        }, result);
    }
    if ((result === null || result === void 0 ? void 0 : result.dob_match) !== 'Y') {
        const v = yield externalVerification_1.default.create({
            payload: data,
            response: result,
            isVerified: false,
            name: externalVerification_2.EExternalVerification.pan,
        });
        return (0, responseWrapper_1.default)(false, "Date doesn't match with pan number.", 400, {
            verification: v._id,
        }, result);
    }
    const v = yield externalVerification_1.default.create({
        payload: data,
        response: result,
        isVerified: true,
        name: externalVerification_2.EExternalVerification.pan,
    });
    return (0, responseWrapper_1.default)(true, result === null || result === void 0 ? void 0 : result.message, 200, {
        result: result,
        verification: v._id,
    });
}));
exports.verifyBankFrsService = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18;
    const { account_number, ifsc, consent = 'Y' } = req.body;
    const data = {
        ifsc,
        account_number,
        consent,
    };
    const response = yield (0, axiosRequest_1.default)({
        method: 'post',
        url: `${frsBaseUrl}/verify/bank?acc_number=${account_number}&ifsc=${ifsc}`,
        headers: frsHeaders,
    });
    if (!(response === null || response === void 0 ? void 0 : response.success)) {
        const e = (_8 = (_7 = (_6 = response === null || response === void 0 ? void 0 : response.error) === null || _6 === void 0 ? void 0 : _6.response) === null || _7 === void 0 ? void 0 : _7.data) === null || _8 === void 0 ? void 0 : _8.error;
        const v = yield externalVerification_1.default.create({
            name: externalVerification_2.EExternalVerification.bank,
            payload: data,
            response: e,
            isVerified: false,
        });
        return (0, responseWrapper_1.default)(false, (_9 = e === null || e === void 0 ? void 0 : e.message) !== null && _9 !== void 0 ? _9 : messages_enum_1.COMMON_MESSAGE.Error, 400, { verification: v === null || v === void 0 ? void 0 : v._id }, e);
    }
    const result = (_11 = (_10 = response === null || response === void 0 ? void 0 : response.response) === null || _10 === void 0 ? void 0 : _10.data) === null || _11 === void 0 ? void 0 : _11.data;
    if (!(result === null || result === void 0 ? void 0 : result.id)) {
        const v = yield externalVerification_1.default.create({
            payload: data,
            response: result,
            isVerified: false,
            name: externalVerification_2.EExternalVerification.bank,
        });
        return (0, responseWrapper_1.default)(false, 'Bank verification failed.', 400, {
            verification: v._id,
        }, result);
    }
    const statusResponse = yield (0, axiosRequest_1.default)({
        method: 'get',
        url: `${frsBaseUrl}/verify/status?type=bank&id=${result === null || result === void 0 ? void 0 : result.id}`,
        headers: frsHeaders,
    });
    if (!(statusResponse === null || statusResponse === void 0 ? void 0 : statusResponse.success)) {
        const e = (_14 = (_13 = (_12 = statusResponse === null || statusResponse === void 0 ? void 0 : statusResponse.error) === null || _12 === void 0 ? void 0 : _12.response) === null || _13 === void 0 ? void 0 : _13.data) === null || _14 === void 0 ? void 0 : _14.error;
        const v = yield externalVerification_1.default.create({
            name: externalVerification_2.EExternalVerification.bank,
            payload: data,
            response: e,
            isVerified: false,
        });
        return (0, responseWrapper_1.default)(false, (_15 = e === null || e === void 0 ? void 0 : e.message) !== null && _15 !== void 0 ? _15 : messages_enum_1.COMMON_MESSAGE.Error, 400, { verification: v === null || v === void 0 ? void 0 : v._id }, e);
    }
    const statusResult = (_17 = (_16 = statusResponse === null || statusResponse === void 0 ? void 0 : statusResponse.response) === null || _16 === void 0 ? void 0 : _16.data) === null || _17 === void 0 ? void 0 : _17.data;
    if ((statusResult === null || statusResult === void 0 ? void 0 : statusResult.bank_status) !== 'COMPLETED') {
        const v = yield externalVerification_1.default.create({
            payload: data,
            response: result,
            isVerified: false,
            name: externalVerification_2.EExternalVerification.bank,
        });
        return (0, responseWrapper_1.default)(false, 'Invalid bank account number.', 400, {
            verification: v._id,
        }, result);
    }
    const v = yield externalVerification_1.default.create({
        payload: data,
        response: result,
        isVerified: true,
        name: externalVerification_2.EExternalVerification.bank,
    });
    const ifscRes = yield (0, axiosRequest_1.default)({
        method: 'get',
        url: constants_1.externalApis.ifsc + ifsc,
    });
    return (0, responseWrapper_1.default)(true, messages_enum_1.COMMON_MESSAGE.Success, 200, {
        result: Object.assign(Object.assign({}, result), statusResult),
        verification: v._id,
        ifscRes: (_18 = ifscRes === null || ifscRes === void 0 ? void 0 : ifscRes.response) === null || _18 === void 0 ? void 0 : _18.data,
    });
}));
