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
const generateToken_1 = __importDefault(require("./generateToken"));
const env_config_1 = __importDefault(require("../config/env.config"));
const logger_1 = __importDefault(require("../helpers/logger"));
function downloadDocusignDoc(envelopeId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, generateToken_1.default)();
            const dsApiClient = new docusign_esign_1.default.ApiClient();
            const baseUrl = (0, env_config_1.default)('DOCUSIGN_ACCOUNT_BASE_URL');
            dsApiClient.setBasePath(baseUrl);
            dsApiClient.addDefaultHeader('Authorization', 'Bearer ' + (data === null || data === void 0 ? void 0 : data.access_token));
            const accountId = String((0, env_config_1.default)('DOCUSIGN_ACCOUNT_ID'));
            const envelopesApi = new docusign_esign_1.default.EnvelopesApi(dsApiClient);
            const documentBytes = yield envelopesApi.getDocument(accountId, envelopeId, 'combined', null);
            return documentBytes;
        }
        catch (error) {
            logger_1.default.error('Error while downloadDocusignDoc: ' + (error === null || error === void 0 ? void 0 : error.message), {
                data: error,
                log: 'error',
            });
        }
    });
}
exports.default = downloadDocusignDoc;
