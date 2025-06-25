"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
function getEnv(key) {
    const val = process.env[key];
    if (key === 'PORT')
        return val !== null && val !== void 0 ? val : '8000';
    if (key === 'MONGO_URL')
        return val !== null && val !== void 0 ? val : '';
    if (key === 'LOG_FILE_MAX_SIZE')
        return val !== null && val !== void 0 ? val : '2m';
    if (key === 'MAX_LOG_FILES')
        return val !== null && val !== void 0 ? val : '15d';
    if (key === 'JWT_SECRET')
        return val !== null && val !== void 0 ? val : '';
    if (key === 'RESET_PASSWORD_EXPIRY_MINUTES')
        return val !== null && val !== void 0 ? val : '10';
    if (key === 'PASSWORD_EXPIRY_MONTHS')
        return val !== null && val !== void 0 ? val : '3';
    if (key === 'DOCUSIGN_MAX_RETRY_COUNT')
        return val !== null && val !== void 0 ? val : '3';
    if (key === 'TICKET_UPDATE_DELAY')
        return val !== null && val !== void 0 ? val : '8000';
    if (key === 'DOCUSIGN_AUTHORITY_SIGNER_EMAIL')
        return val !== null && val !== void 0 ? val : 'vishvajeet.zala@alineahealthcare.in';
    if (key === 'DOCUSIGN_AUTHORITY_SIGNER_NAME')
        return val !== null && val !== void 0 ? val : 'Vishvajeet';
    return val;
}
exports.default = getEnv;
