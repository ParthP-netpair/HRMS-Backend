"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomToken = exports.decryptData = exports.encryptData = void 0;
const crypto_1 = __importDefault(require("crypto"));
const env_config_1 = __importDefault(require("../config/env.config"));
const logger_1 = __importDefault(require("./logger"));
function encryptData(payload) {
    var _a, _b;
    const data = JSON.stringify(payload);
    const secretKey = (_a = (0, env_config_1.default)('ENCRYPT_SECRET_KEY')) !== null && _a !== void 0 ? _a : '';
    const secretIV = (_b = (0, env_config_1.default)('ENCRYPT_SECRET_IV')) !== null && _b !== void 0 ? _b : '';
    const key = crypto_1.default.createHash('sha512').update(secretKey).digest('hex').substring(0, 32);
    const iv = crypto_1.default.createHash('sha512').update(secretIV).digest('hex').substring(0, 16);
    const cipher = crypto_1.default.createCipheriv('aes-256-cbc', key, iv);
    const c = Buffer.from(cipher.update(data, 'utf8', 'hex') + cipher.final('hex')).toString('base64');
    return c;
}
exports.encryptData = encryptData;
function decryptData(encryptedData) {
    var _a, _b;
    try {
        const secretKey = (_a = (0, env_config_1.default)('ENCRYPT_SECRET_KEY')) !== null && _a !== void 0 ? _a : '';
        const secretIV = (_b = (0, env_config_1.default)('ENCRYPT_SECRET_IV')) !== null && _b !== void 0 ? _b : '';
        const key = crypto_1.default.createHash('sha512').update(secretKey).digest('hex').substring(0, 32);
        const iv = crypto_1.default.createHash('sha512').update(secretIV).digest('hex').substring(0, 16);
        const buff = Buffer.from(encryptedData, 'base64');
        const decipher = crypto_1.default.createDecipheriv('aes-256-cbc', key, iv);
        const d = decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8');
        if (!d)
            return null;
        return JSON.parse(d !== null && d !== void 0 ? d : '{}');
    }
    catch (error) {
        logger_1.default.error('Error while decryptData: ' + (error === null || error === void 0 ? void 0 : error.message), { data: error, log: 'error' });
        return null;
    }
}
exports.decryptData = decryptData;
const generateRandomToken = () => crypto_1.default.randomBytes(24).toString('hex');
exports.generateRandomToken = generateRandomToken;
