import { Request, Response, NextFunction } from "express";

import httpStatus from "http-status";

type AppError = Error & {
  type: string
}

const CODES = {
  "NotFound": httpStatus.NOT_FOUND,
  "Conflict": httpStatus.CONFLICT,
  "BadRequest": httpStatus.BAD_REQUEST,
  "UnprocessableEntity": httpStatus.UNPROCESSABLE_ENTITY,
  "Forbidden": httpStatus.FORBIDDEN,
} as const;

export default function errorHandlingMiddleware(
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction) {

  console.log(error);

  const { name, message } = error;

  if (name in CODES) {
    return res.status(CODES[name]).send(message);
  } else {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
