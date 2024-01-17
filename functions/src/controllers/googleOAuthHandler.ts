import { NextFunction, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import * as User from '../models/userModel';
import { clearRefreshAndAccessTokenCookies, setRefreshAndAccessTokenCookies } from '../utils/authHelper';
import { calculateAutoLogoutAt, calculateExpiresAt } from '../utils/expiresAt';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/tokenGenerator';

const clientId = process.env.GOOGLE_CLIENT_ID as string;

export const googleOAuthHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const cookies = req.cookies;
    const credential = req.body.credential;
    const redirectUri = req.query.redirect_uri as string;
    const client = new OAuth2Client(clientId);

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).send('Invalid token');
    }

    const email = payload.email;
    if (!email) {
      return res.status(422).send('Email not provided in the token payload');
    }

    const user = await User.findByEmailOrCreate(email);

    let newRefreshTokenArray = !cookies.refreshToken
      ? user.refreshToken
      : user.refreshToken.filter((rt) => rt.token !== cookies.refreshToken);

    if (cookies.refreshToken) {
      const foundToken = await User.findByToken({
        refreshToken: cookies.refreshToken,
      });
      if (!foundToken) {
        newRefreshTokenArray = [];
      }

      clearRefreshAndAccessTokenCookies(res);
    }

    const accessToken = generateAccessToken({
      userId: user._id,
      username: user.username || '',
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id,
      username: user.username || '',
      role: user.role,
    });

    const updatedUser = await User.updateById(user._id, {
      refreshToken: [
        ...newRefreshTokenArray,
        {
          token: refreshToken,
          expiresAt: calculateExpiresAt(),
          autoLogoutAt: calculateAutoLogoutAt(),
        },
      ],
    });

    const currentDate = new Date();
    const validRefreshTokens = updatedUser.refreshToken.filter(
      (rt) => new Date(rt.expiresAt) > currentDate
    );

    if (validRefreshTokens.length !== updatedUser.refreshToken.length) {
      await User.updateById(user._id, {
        refreshToken: [...validRefreshTokens],
      });
    }

    setRefreshAndAccessTokenCookies(res, { refreshToken, accessToken });

    if (req.headers.origin === redirectUri) {
      return res.sendStatus(200);
    }
    return res.redirect(redirectUri);
  } catch (error) {
    next(error);
  }
};
