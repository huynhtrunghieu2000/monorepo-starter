import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { NextFunction, Request, Response } from 'express';
import pick from '../utils/pick';
import { z } from 'zod';

type RequestValidationSchemeObject = {
  body?: z.ZodTypeAny | z.ZodString;
  params?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
  headers?: z.ZodTypeAny;
};

const validate = (schema: RequestValidationSchemeObject) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const reqObj = Object.entries(req).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as Record<string, unknown>);
  const obj = pick(reqObj, Object.keys(validSchema));
  const { data, error } = z.object(validSchema).safeParse(obj);
  if (error) {
    const errorMessage = error.errors.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, data);
  return next();
};

export default validate;
