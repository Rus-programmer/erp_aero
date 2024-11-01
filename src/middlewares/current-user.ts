import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

import {UserPayload} from "../types/user";

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.accessToken) {
    return next();
  }

  try {
    req.currentUser = jwt.verify(req.session.accessToken, process.env.JWT_SECRET!) as UserPayload;
  } catch (err) {
    console.log('current user', err)
  }

  next();
};
