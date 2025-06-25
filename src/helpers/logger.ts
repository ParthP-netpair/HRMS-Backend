import { addColors, createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import getEnv from '../config/env.config';
const { combine, timestamp, colorize, prettyPrint, simple, json } = format;

addColors({
  info: 'cyan',
  error: 'red',
  request: 'yellow',
  response: 'yellow',
});

const dailyRotate: DailyRotateFile = new DailyRotateFile({
  filename: '%DATE%-error.log',
  datePattern: 'DD-MM-YYYY',
  dirname: 'logs/',
  zippedArchive: true,
  maxSize: getEnv('LOG_FILE_MAX_SIZE'),
  maxFiles: getEnv('MAX_LOG_FILES'),
});

const consoleLogger = createLogger({
  format: combine(colorize(), simple()),
  transports: [new transports.Console()],
});

const logger = createLogger({
  format: json(),
  transports: [
    dailyRotate,
    new transports.Console({
      format: combine(colorize(), prettyPrint(), timestamp({ format: ' DD-MM-YYYY /  HH:mm:ss ' })),
      log: (info, next) => {
        const logs = ['log', 'error', 'warn', 'info'];
        const log = logs.includes(info?.log) ? info?.log : 'warn';
        let msg = '';
        if (info?.data?.method) msg += info?.data?.method + ' : ';
        if (info?.data?.api) msg += info?.data?.api + ' : ';
        msg += info?.message;
        consoleLogger[log](msg);
        next();
      },
    }),
  ],
});

export default logger;
