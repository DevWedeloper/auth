import { NextFunction, Request, Response } from 'express';
import { refreshAccessToken } from '../../use-case/types/auth.type';
import {
  clearRefreshAndAccessTokenCookies,
  setRefreshAndAccessTokenCookies,
} from '../utils/auth-helper';

export const makeRefreshAccessTokenEndpoint = ({
  refreshAccessToken,
}: {
  refreshAccessToken: refreshAccessToken;
}) => {
  const refreshAccessTokenEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      clearRefreshAndAccessTokenCookies(res);

      const { accessToken, refreshToken } = await refreshAccessToken(
        req.cookies.refreshToken
      );

      setRefreshAndAccessTokenCookies(res, {
        refreshToken,
        accessToken,
      });
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  };
  return refreshAccessTokenEndpoint;
};
