import getEnv from '../config/env.config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signJwt = (user: any, rememberMe?: boolean) => {
  const expiresIn = rememberMe ? getEnv('REMEMBER_ME_JWT_EXPIRE') : getEnv('JWT_EXPIRE');
  const secret = getEnv('JWT_SECRET');
  const token = jwt.sign({ user }, secret, {
    expiresIn: expiresIn as jwt.SignOptions['expiresIn'],
  });
  return token;
};

export const hashPassword = async (p: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(p, salt);
  return hash;
};
export const comparePassword = async (p: string, hash: string) => await bcrypt.compare(p, hash);
