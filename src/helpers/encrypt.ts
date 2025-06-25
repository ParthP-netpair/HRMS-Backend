import crypto from 'crypto';
import getEnv from '../config/env.config';
import logger from './logger';

export function encryptData(payload: any) {
  const data = JSON.stringify(payload);
  const secretKey = getEnv('ENCRYPT_SECRET_KEY') ?? '';
  const secretIV = getEnv('ENCRYPT_SECRET_IV') ?? '';
  const key = crypto.createHash('sha512').update(secretKey).digest('hex').substring(0, 32);
  const iv = crypto.createHash('sha512').update(secretIV).digest('hex').substring(0, 16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  const c = Buffer.from(cipher.update(data, 'utf8', 'hex') + cipher.final('hex')).toString(
    'base64',
  );
  return c;
}

export function decryptData(encryptedData: string) {
  try {
    const secretKey = getEnv('ENCRYPT_SECRET_KEY') ?? '';
    const secretIV = getEnv('ENCRYPT_SECRET_IV') ?? '';

    const key = crypto.createHash('sha512').update(secretKey).digest('hex').substring(0, 32);
    const iv = crypto.createHash('sha512').update(secretIV).digest('hex').substring(0, 16);

    const buff = Buffer.from(encryptedData, 'base64');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    const d = decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8');
    if (!d) return null;
    return JSON.parse(d ?? '{}');
  } catch (error) {
    logger.error('Error while decryptData: ' + error?.message, { data: error, log: 'error' });
    return null;
  }
}

export const generateRandomToken = () => crypto.randomBytes(24).toString('hex');
