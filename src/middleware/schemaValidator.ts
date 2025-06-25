import z from 'zod';
import responseWrapper from '../helpers/responseWrapper';
import { NextFunction, Response, Request } from 'express';
import logger from '../helpers/logger';

const schemaValidator =
  (schema: z.AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    const re = responseWrapper(false, 'Schema validation failed', 400, null, null);
    try {
      // const extended = schema.extend({
      //   note: z.string().optional(),
      //   param_one: z.string().optional(),
      //   param_two: z.string().optional(),
      //   param_three: z.string().optional(),
      // });
      const valid = schema.safeParse(req.body);
      if (valid?.success === false) {
        const { errors } = valid.error;
        const { path, message } = errors[0];
        return res.json({
          ...re,
          error: errors,
          message: `${path.join('.')}: ${message}`,
        });
      }
      req.body = valid.data;
      return next();
    } catch (error) {
      logger.error('Error in schemaValidator: ' + error?.message, {
        data: error,
        log: 'error',
      });
      return res.json({ ...re, message: error.message || '', error });
    }
  };
export default schemaValidator;
