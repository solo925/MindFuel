import { Request, Response, NextFunction } from "express";

export interface R2 extends Request {
  path: string;
  timeStamp?: string;
}

type Middleware = (req: any, res: Response, next: NextFunction) => void;

export const urlVersioning = (version: string): Middleware => {
  return (req, res, next) => {
    if (req.path.startsWith(`/api/${version}`)) {
      next();
    } else {
      res.status(404).json({
        success: false,
        error: "API version is not supported",
      });
    }
  };
};


export default urlVersioning ;
