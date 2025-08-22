import { Request, Response, NextFunction } from 'express';

interface CustomError {
  status?: number;
  msg?: string;
}

export interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};

export const schemaErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.status === 400) {
    /*TODO: tidy this up: I don't think I've done it the correct way.*/
    const customError: CustomError = err;
    res.status(err.status).json({ message: customError.msg });
  }
};
