import { NextFunction, Request, Response } from 'express';
import { googleOAuthHandler } from '../../use-case/types/auth.type';
import {
  clearRefreshAndAccessTokenCookies,
  setRefreshAndAccessTokenCookies,
} from '../utils/auth-helper';

export const makeGoogleOAuthHandlerEndpoint = ({
  googleOAuthHandler,
}: {
  googleOAuthHandler: googleOAuthHandler;
}) => {
  const googleOAuthHandlerEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const redirectUri = req.query.redirect_uri as string;

      if (req.cookies.refreshToken) {
        clearRefreshAndAccessTokenCookies(res);
      }

      const { accessToken, refreshToken } = await googleOAuthHandler(
        req.cookies.refreshToken,
        req.body.credential
      );

      setRefreshAndAccessTokenCookies(res, { refreshToken, accessToken });

      if (req.headers.origin === redirectUri) {
        return res.sendStatus(200);
      }
      return res.redirect(redirectUri);
    } catch (error) {
      next(error);
    }
  };
  return googleOAuthHandlerEndpoint;
};
