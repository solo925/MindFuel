import { Request, Response, NextFunction } from "express";
import { ValidationError as SequelizeValidationError } from "sequelize";


export class APIError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "APIError";
    Object.setPrototypeOf(this, APIError.prototype);
  }
}


export const asyncHandler =
  (fn: (req: Request, res: any, next: NextFunction) => Promise<void>) =>
  (req: Request, res: any, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// address the any types later
export const globalErrorHandler = (
  err: any, 
  req: Request,
  res: any, 
  next: NextFunction
): any => { 
  console.error(err.stack);

  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      status: "Error",
      message: err.message,
    });
  }

  if (err instanceof SequelizeValidationError) {
    return res.status(400).json({
      status: "error",
      message: "Validation error",
      errors: err.errors.map((e: any) => e.message),
    });
  }

  if (err.name === "SequelizeDatabaseError") {
    return res.status(400).json({
      status: "error",
      message: "A database query error occurred",
      detail: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "An unexpected error occurred",
  });
};
