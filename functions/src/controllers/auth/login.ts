import { NextFunction, Request, Response } from 'express';
import { login } from '../../use-case/types/auth.type';
import {
  clearRefreshAndAccessTokenCookies,
  setRefreshAndAccessTokenCookies,
} from '../utils/auth-helper';

export const makeLoginEndpoint = ({ login }: { login: login }) => {
  const loginEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      if (req.cookies.refreshToken) {
        clearRefreshAndAccessTokenCookies(res);
      }

      const { accessToken, refreshToken } = await login(
        req.body.username,
        req.body.password,
        req.cookies.refreshToken,
      );

      setRefreshAndAccessTokenCookies(res, { refreshToken, accessToken });
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  };
  return loginEndpoint;
};
