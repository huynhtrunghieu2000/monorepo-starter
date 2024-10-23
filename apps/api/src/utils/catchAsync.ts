import { RequestHandler } from 'express';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export interface CustomParamsDictionary {
  [key: string]: unknown;
}

const catchAsync =
  (fn: RequestHandler<CustomParamsDictionary, unknown, unknown, ParsedQs, Record<string, unknown>>) =>
  (
    req: Request<CustomParamsDictionary, unknown, unknown, ParsedQs, Record<string, unknown>>,
    res: Response<unknown, Record<string, unknown>, number>,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };

export default catchAsync;
