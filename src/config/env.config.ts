import 'dotenv/config';

interface ICustomProcessEnv {
  NODE_ENV: 'development' | 'production';
  PORT?: string;
  SMTP_EMAIL_HOST: string;
  SMTP_EMAIL_PORT: string;
  SMTP_EMAIL_USER: string;
  SMTP_EMAIL_PASSWORD: string;
  SMTP_EMAIL_SECURE: string;
  SMTP_EMAIL_FROM: string;
  MONGO_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRE: string;
  REMEMBER_ME_JWT_EXPIRE: string;
  PASSWORD_EXPIRY_MONTHS: string;
  RESET_PASSWORD_EXPIRY_MINUTES: string;
  ENCRYPT_SECRET_KEY: string;
  ENCRYPT_SECRET_IV: string;
  FRESHDESK_USERNAME: string;
  FRESHDESK_PASSWORD: string;
  FRESHDESK_URL: string;
  FRONTEND_URL: string;
  LOG_FILE_MAX_SIZE: string;
  MAX_LOG_FILES: string;
  GRIDLINES_API_KEY: string;
  GRIDLINES_API_URL: string;
  TICKET_UPDATE_DELAY: string;
  FRS_ATLAS_USERNAME: string;
  FRS_ATLAS_PASSWORD: string;
  FRS_ATLAS_URL: string;
  BACKEND_URL: string;
  OTP_EXPIRY_MINUTES: string;
  OTP_LENGTH: string;
}

/**
 *
 * @param key
 * @returns Environment variable
 */
export default function getEnv<T extends keyof ICustomProcessEnv>(key: T): string | undefined {
  const val = process.env[key];
  if (key === 'PORT') return val ?? '8000';
  if (key === 'MONGO_URL') return val ?? '';
  if (key === 'LOG_FILE_MAX_SIZE') return val ?? '2m';
  if (key === 'MAX_LOG_FILES') return val ?? '15d';
  if (key === 'JWT_SECRET') return val ?? '';
  if (key === 'RESET_PASSWORD_EXPIRY_MINUTES') return val ?? '10';
  if (key === 'PASSWORD_EXPIRY_MONTHS') return val ?? '3';
  if (key === 'TICKET_UPDATE_DELAY') return val ?? '8000';
  if (key === 'OTP_EXPIRY_MINUTES') return val ?? '6';
  if (key === 'OTP_LENGTH') return val ?? '6';
  return val;
}
