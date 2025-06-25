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
const docusign_esign_1 = __importDefault(require("docusign-esign"));
const env_config_1 = __importDefault(require("../config/env.config"));
const generateToken_1 = __importDefault(require("./generateToken"));
const getEnvelopDetails = (envelopeId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = yield (0, generateToken_1.default)();
    const dsApiClient = new docusign_esign_1.default.ApiClient();
    dsApiClient.setBasePath((0, env_config_1.default)('DOCUSIGN_ACCOUNT_BASE_URL'));
    dsApiClient.addDefaultHeader('Authorization', 'Bearer ' + data.access_token);
    const envelopesApi = new docusign_esign_1.default.EnvelopesApi(dsApiClient);
    const envelope = yield envelopesApi.getEnvelope(String((0, env_config_1.default)('DOCUSIGN_ACCOUNT_ID')), envelopeId);
    const recipientsList = yield envelopesApi.listRecipients(String((0, env_config_1.default)('DOCUSIGN_ACCOUNT_ID')), envelopeId);
    const recipientStatuses = (_a = recipientsList === null || recipientsList === void 0 ? void 0 : recipientsList.signers) === null || _a === void 0 ? void 0 : _a.map(signer => ({
        recipientId: signer.recipientId,
        email: signer.email,
        name: signer.name,
        status: signer.status,
        signedDateTime: signer.signedDateTime,
        deliveredDateTime: signer.deliveredDateTime,
    }));
    const result = {
        envelope: {
            envelopeStatus: envelope === null || envelope === void 0 ? void 0 : envelope.status,
            envelopeId: envelope === null || envelope === void 0 ? void 0 : envelope.envelopeId,
            envelopeDate: new Date(envelope === null || envelope === void 0 ? void 0 : envelope.sentDateTime),
            envelopeUri: envelope === null || envelope === void 0 ? void 0 : envelope.envelopeUri,
            envelopeExpireDate: new Date(envelope === null || envelope === void 0 ? void 0 : envelope.expireDateTime),
        },
        statusChangedDateTime: envelope === null || envelope === void 0 ? void 0 : envelope.statusChangedDateTime,
        recipientStatuses,
    };
    return result;
});
exports.default = getEnvelopDetails;
