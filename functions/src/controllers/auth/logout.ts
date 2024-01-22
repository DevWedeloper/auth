import { NextFunction, Request, Response } from 'express';
import { logout } from '../../use-case/types/auth.type';
import { clearRefreshAndAccessTokenCookies } from '../utils/auth-helper';

export const makeLogoutEndpoint = ({ logout }: { logout: logout }) => {
  const logoutEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      await logout(req.cookies.refreshToken);
      clearRefreshAndAccessTokenCookies(res);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
  return logoutEndpoint;
};
