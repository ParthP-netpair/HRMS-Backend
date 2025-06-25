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
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_config_1 = __importDefault(require("./env.config"));
const logger_1 = __importDefault(require("../helpers/logger"));
const sendMailService = (props) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { toMail, template, from, subject, attachments } = props;
        const transportOpts = {
            host: String((0, env_config_1.default)('SMTP_EMAIL_HOST')),
            port: Number((0, env_config_1.default)('SMTP_EMAIL_PORT')),
            secure: (0, env_config_1.default)('SMTP_EMAIL_SECURE') === 'true',
            auth: {
                user: (0, env_config_1.default)('SMTP_EMAIL_USER'),
                pass: (0, env_config_1.default)('SMTP_EMAIL_PASSWORD'),
            },
        };
        const transporter = nodemailer_1.default.createTransport(transportOpts);
        const payload = {
            from: (0, env_config_1.default)('SMTP_EMAIL_FROM'),
            to: toMail,
            subject: subject !== null && subject !== void 0 ? subject : 'Hi',
            html: template,
        };
        if (attachments)
            payload.attachments = attachments;
        const info = yield transporter.sendMail(payload);
        return info;
    }
    catch (err) {
        logger_1.default.error('Error in sendMailService: ' + (err === null || err === void 0 ? void 0 : err.message), { data: err, log: 'error' });
        return err;
    }
});
exports.default = sendMailService;
