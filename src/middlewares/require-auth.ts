import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log('requireAuth userId', req.currentUser?.id)
  if (!req.currentUser?.id) {
    throw new NotAuthorizedError();
  }

  next();
};
