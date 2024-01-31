import { NextFunction, Request, Response } from 'express';
import { isLoggedIn } from '../use-case/types/auth.type';

export const makeIsLoggedInMiddleware = ({
  isLoggedIn,
}: {
  isLoggedIn: isLoggedIn;
}) => {
  const isLoggedInMiddleware = async (
    req: Request,
    _: Response,
    next: NextFunction,
  ) => {
    try {
      isLoggedIn(req.cookies.accessToken);
      next();
    } catch (error) {
      next(error);
    }
  };
  return isLoggedInMiddleware;
};
