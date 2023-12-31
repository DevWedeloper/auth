import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import * as RefreshToken from '../models/refreshAccessTokenModel';
import { generateAccessToken } from '../utils/tokenGenerator';

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res
        .status(401)
        .json({ error: 'Unauthorized', message: 'Refresh token is missing.' });
    }

    const currentRefreshToken = await RefreshToken.isExisting(refreshToken);
    if (!currentRefreshToken) {
      return res.status(403).json({
        error: 'Unauthorized',
        message: 'Refresh token not in database.',
      });
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        currentRefreshToken.token,
        refreshTokenSecret
      ) as JwtPayload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(401).json({ error: 'Token expired' });
      } else {
        return res
          .status(500)
          .json({ error: 'Failed to refresh token', message: error });
      }
    }

    const accessToken = generateAccessToken({
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role,
    });
    return res.status(201).json({ accessToken });
  } catch (error) {
    next(error);
  }
};
