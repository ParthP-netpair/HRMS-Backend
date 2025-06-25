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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const env_config_1 = __importDefault(require("../config/env.config"));
const getToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const DOCUSIGN_RSA_KEY = fs_1.default.readFileSync(path_1.default.join(__dirname, '../keys/private.key'));
    const dsApi = new docusign_esign_1.default.ApiClient();
    dsApi.setOAuthBasePath((0, env_config_1.default)('DOCUSIGN_AUTH_JWT_URL'));
    const expiredIn = 10 * 60;
    const results = yield dsApi.requestJWTUserToken((0, env_config_1.default)('DOCUSIGN_INTEGRATION_KEY'), (0, env_config_1.default)('DOCUSIGN_USER_ID'), ['signature'], DOCUSIGN_RSA_KEY, expiredIn);
    return results.body;
});
exports.default = getToken;
