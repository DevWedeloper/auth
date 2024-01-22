import { NextFunction, Request, Response } from 'express';
import { getAutoLogoutAt } from '../../use-case/types/auth.type';
import { UnauthorizedError } from '../../utils/errors';
import { clearRefreshAndAccessTokenCookies } from '../utils/auth-helper';

export const makeGetAutoLogoutAtEndpoint = ({
  getAutoLogoutAt,
}: {
  getAutoLogoutAt: getAutoLogoutAt;
}) => {
  const getAutoLogoutAtEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const { expired } = await getAutoLogoutAt(req.body.refreshToken);
      if (expired) {
        clearRefreshAndAccessTokenCookies(res);
        throw new UnauthorizedError('Session expired.');
      }
      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  };
  return getAutoLogoutAtEndpoint;
};
