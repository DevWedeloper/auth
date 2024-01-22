import { NextFunction, Request, Response } from 'express';
import { loggedInUser } from '../use-case/types/auth.type';

export const makeLoggedInUserMiddleware = ({
  loggedInUser,
}: {
  loggedInUser: loggedInUser;
}) => {
  const loggedInUserMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const token = req.cookies.accessToken;
      const { userId, role } = loggedInUser(token);
      req.body.userId = userId;
      req.body.role = role;

      next();
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
  return loggedInUserMiddleware;
};
