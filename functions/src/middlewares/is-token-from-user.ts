import { NextFunction, Request, Response } from 'express';
import { isTokenFromUser } from '../use-case/types/auth.type';

export const makeIsTokenFromUserMiddleware = ({
  isTokenFromUser,
}: {
  isTokenFromUser: isTokenFromUser;
}) => {
  const isTokenFromUserMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      await isTokenFromUser(req.cookies.accessToken, req.body.email);
      next();
    } catch (error) {
      next(error);
    }
  };
  return isTokenFromUserMiddleware;
};
