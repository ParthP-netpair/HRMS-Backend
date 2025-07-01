import getEnv from '../config/env.config';

export const asyncDelay = (ms?: number) => {
  const d = ms ? ms : Number(getEnv('TICKET_UPDATE_DELAY'));
  return new Promise(resolve => setTimeout(resolve, d));
};


export interface OtpData {
  otp: string;
  expiresAt: Date;
  OTP_EXPIRY_MINUTES: number;
}


export const generateOtp = (): OtpData => {
  const OTP_LENGTH = Number(getEnv("OTP_LENGTH") || 6);
  const OTP_EXPIRY_MINUTES = Number(getEnv("OTP_EXPIRY_MINUTES") || 1);

  const otp = Math.floor(
    10 ** (OTP_LENGTH - 1) + Math.random() * 9 * 10 ** (OTP_LENGTH - 1)
  ).toString();

  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  return { otp, expiresAt, OTP_EXPIRY_MINUTES };
};