import { NextFunction, Response, Request as ExpressRequest } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import getEnv from '../config/env.config';
// import { TCustomExpressRequest } from '../types/common';
import responseWrapper from '../helpers/responseWrapper';
import { COMMON_MESSAGE } from '../utils/messages.enum';
import logger from '../helpers/logger';

const secret = getEnv('JWT_SECRET');
export interface AuthenticatedRequest extends ExpressRequest {
  token?: string | JwtPayload | UserPayload;
}

interface UserPayload {
  user: {
    _id: string;
    [key: string]: any;
  };
  iat?: number;
  exp?: number;
}

const authMw = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(200).json(responseWrapper(false, COMMON_MESSAGE.Unauthorized, 401, null, null));
      return;
    }

    const decoded = jwt.verify(token, secret);
    req.token = decoded as JwtPayload;
    next();
  } catch (err: any) {
    if (err?.name === 'TokenExpiredError') {
      res.status(401).json(responseWrapper(false, COMMON_MESSAGE.SessionExpired, 401, null, err));
      return;
    }

    logger.error('Error in authMw: ' + err?.message, { data: err, log: 'error' });

    res
      .status(401)
      .json(responseWrapper(false, err?.message || COMMON_MESSAGE.Unauthorized, 401, null, err));
  }
};

export default authMw;
