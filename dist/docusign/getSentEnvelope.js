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
const getSentEnvelopes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const data = yield (0, generateToken_1.default)();
        const accessToken = data.access_token;
        const dsApiClient = new docusign_esign_1.default.ApiClient();
        dsApiClient.setBasePath('https://demo.docusign.net/restapi');
        dsApiClient.addDefaultHeader('Authorization', `Bearer ${accessToken}`);
        const envelopesApi = new docusign_esign_1.default.EnvelopesApi(dsApiClient);
        const accountId = String((0, env_config_1.default)('DOCUSIGN_ACCOUNT_ID'));
        const status = 'sent';
        const options = {
            fromDate: '2023-01-01T00:00:00Z',
            toDate: '2024-08-28T00:00:00Z',
            status: status,
        };
        const results = yield envelopesApi.listStatusChanges(accountId, options);
        const filteredEnvelopes = (_a = results === null || results === void 0 ? void 0 : results.envelopes) === null || _a === void 0 ? void 0 : _a.map(envelope => ({
            envelopeId: envelope.envelopeId,
            createdDateTime: envelope.createdDateTime,
            sentDateTime: envelope.sentDateTime,
            status: envelope.status,
            emailSubject: envelope.emailSubject,
        }));
        res.status(200).json(filteredEnvelopes);
    }
    catch (error) {
        console.error('Error retrieving sent envelopes:', error);
        res.status(500).json({ error: 'Failed to retrieve sent envelopes' });
    }
});
exports.default = getSentEnvelopes;
