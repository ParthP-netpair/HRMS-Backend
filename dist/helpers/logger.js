"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const env_config_1 = __importDefault(require("../config/env.config"));
const { combine, timestamp, colorize, prettyPrint, simple, json } = winston_1.format;
(0, winston_1.addColors)({
    info: 'cyan',
    error: 'red',
    request: 'yellow',
    response: 'yellow',
});
const dailyRotate = new winston_daily_rotate_file_1.default({
    filename: '%DATE%-error.log',
    datePattern: 'DD-MM-YYYY',
    dirname: 'logs/',
    zippedArchive: true,
    maxSize: (0, env_config_1.default)('LOG_FILE_MAX_SIZE'),
    maxFiles: (0, env_config_1.default)('MAX_LOG_FILES'),
});
const consoleLogger = (0, winston_1.createLogger)({
    format: combine(colorize(), simple()),
    transports: [new winston_1.transports.Console()],
});
const logger = (0, winston_1.createLogger)({
    format: json(),
    transports: [
        dailyRotate,
        new winston_1.transports.Console({
            format: combine(colorize(), prettyPrint(), timestamp({ format: ' DD-MM-YYYY /  HH:mm:ss ' })),
            log: (info, next) => {
                var _a, _b, _c, _d;
                const logs = ['log', 'error', 'warn', 'info'];
                const log = logs.includes(info === null || info === void 0 ? void 0 : info.log) ? info === null || info === void 0 ? void 0 : info.log : 'warn';
                let msg = '';
                if ((_a = info === null || info === void 0 ? void 0 : info.data) === null || _a === void 0 ? void 0 : _a.method)
                    msg += ((_b = info === null || info === void 0 ? void 0 : info.data) === null || _b === void 0 ? void 0 : _b.method) + ' : ';
                if ((_c = info === null || info === void 0 ? void 0 : info.data) === null || _c === void 0 ? void 0 : _c.api)
                    msg += ((_d = info === null || info === void 0 ? void 0 : info.data) === null || _d === void 0 ? void 0 : _d.api) + ' : ';
                msg += info === null || info === void 0 ? void 0 : info.message;
                consoleLogger[log](msg);
                next();
            },
        }),
    ],
});
exports.default = logger;
