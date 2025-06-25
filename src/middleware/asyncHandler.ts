import { NextFunction, Response } from 'express';
import responseWrapper from '../helpers/responseWrapper';
import { COMMON_MESSAGE } from '../utils/messages.enum';
import logger from '../helpers/logger';
import { TCustomExpressRequest } from '../types/common';

/**
 *
 * @param handler Express request handler.
 * @returns handler
 * @description Wrap async functions from services into this and it'll handle trycatch for them easily at global level.
 */
export default function asyncHandler(
  handler: (
    req: TCustomExpressRequest,
    res: Response,
    next: NextFunction,
    [string]?: any,
  ) => Promise<any>,
) {
  return async (req: TCustomExpressRequest, res: Response, next: NextFunction) => {
    try {
      const r = await handler(req, res, next);
      return r;
    } catch (error) {
      if (req?.mongoSession) {
        await req?.mongoSession.abortTransaction();
        await req?.mongoSession.endSession();
      }
      const data = { method: req.method, api: req.url, body: req.body, error };
      logger.error('error : ' + (error?.message || 'Unknown error!'), {
        data,
        log: 'error',
      });
      const e: any = {
        axiosResponse: error?.response?.data,
        message: error.message,
        error: {
          stack: error?.stack,
          status: error?.status,
          code: error?.code,
        },
      };

      const re = responseWrapper(false, COMMON_MESSAGE.Error, 500, null, e);
      res.status(500);
      return re;
    }
  };
}
