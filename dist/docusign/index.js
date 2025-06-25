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
exports.EDocusignStatus = void 0;
const generateToken_1 = __importDefault(require("./generateToken"));
const docusign_esign_1 = __importDefault(require("docusign-esign"));
const makeEnvelope_1 = __importDefault(require("./makeEnvelope"));
const env_config_1 = __importDefault(require("../config/env.config"));
const sendDocusignEnvelope = (args) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = yield (0, generateToken_1.default)();
        if (!(token === null || token === void 0 ? void 0 : token.access_token))
            return;
        const dsApiClient = new docusign_esign_1.default.ApiClient();
        dsApiClient.setBasePath((0, env_config_1.default)('DOCUSIGN_ACCOUNT_BASE_URL'));
        dsApiClient.addDefaultHeader('Authorization', 'Bearer ' + token.access_token);
        const envelopeDefinition = yield (0, makeEnvelope_1.default)(args);
        if (!envelopeDefinition)
            return;
        const envelopesApi = new docusign_esign_1.default.EnvelopesApi(dsApiClient);
        const results = yield envelopesApi.createEnvelope((0, env_config_1.default)('DOCUSIGN_ACCOUNT_ID'), {
            envelopeDefinition,
        });
        const envelope = yield envelopesApi.getEnvelope(String((0, env_config_1.default)('DOCUSIGN_ACCOUNT_ID')), results === null || results === void 0 ? void 0 : results.envelopeId);
        return {
            envelopeStatus: envelope === null || envelope === void 0 ? void 0 : envelope.status,
            envelopeId: envelope === null || envelope === void 0 ? void 0 : envelope.envelopeId,
            envelopeDate: new Date(envelope === null || envelope === void 0 ? void 0 : envelope.sentDateTime),
            envelopeUri: envelope === null || envelope === void 0 ? void 0 : envelope.envelopeUri,
            envelopeExpireDate: new Date(envelope === null || envelope === void 0 ? void 0 : envelope.expireDateTime),
        };
    }
    catch (e) {
        console.error('Error sending envelope:', {
            msg: e === null || e === void 0 ? void 0 : e.message,
            data: (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data,
        });
        throw e;
    }
});
exports.default = sendDocusignEnvelope;
var EDocusignStatus;
(function (EDocusignStatus) {
    EDocusignStatus["completed"] = "completed";
    EDocusignStatus["pending"] = "pending";
    EDocusignStatus["correct"] = "correct";
    EDocusignStatus["created"] = "created";
    EDocusignStatus["declined"] = "declined";
    EDocusignStatus["deleted"] = "deleted";
    EDocusignStatus["delivered"] = "delivered";
    EDocusignStatus["sent"] = "sent";
    EDocusignStatus["signed"] = "signed";
    EDocusignStatus["template"] = "template";
    EDocusignStatus["timedout"] = "timedout";
    EDocusignStatus["voided"] = "voided";
})(EDocusignStatus || (exports.EDocusignStatus = EDocusignStatus = {}));
