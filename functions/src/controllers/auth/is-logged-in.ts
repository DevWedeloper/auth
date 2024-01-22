import { NextFunction, Request, Response } from 'express';
import { isLoggedIn } from '../../use-case/types/auth.type';

export const makeIsLoggedInEndpoint = ({
  isLoggedIn,
}: {
  isLoggedIn: isLoggedIn;
}) => {
  const isLoggedInEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      isLoggedIn(req.cookies.accessToken);
      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
  return isLoggedInEndpoint;
};
