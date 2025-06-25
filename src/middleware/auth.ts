import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import getEnv from '../config/env.config';
import { TCustomExpressRequest } from '../types/common';
import responseWrapper from '../helpers/responseWrapper';
import { COMMON_MESSAGE } from '../utils/messages.enum';
import logger from '../helpers/logger';

const secret = getEnv('JWT_SECRET');
const response = responseWrapper(false, COMMON_MESSAGE.Unauthorized, 401, null, null);

const authMw = async (req: TCustomExpressRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.json(response);
    const decoded = jwt.verify(token, secret);
    req.token = decoded as any;
    res.status(200);
    return next();
  } catch (err) {
    if (err && err?.name === 'TokenExpiredError') {
      return res.json({ ...response, error: err, message: COMMON_MESSAGE.SessionExpired });
    }
    logger.error('Error in authMw: ' + err?.message, { data: err, log: 'error' });
    return res.json({ ...response, message: err?.message, error: err });
  }
};

export default authMw;
