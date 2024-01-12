import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import * as User from '../models/userModel';
import { calculateExpiresAt } from '../utils/expiresAt';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/tokenGenerator';

export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Refresh token is missing.',
      });
    }

    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    const user = await User.findByToken({ refreshToken });
    if (!user) {
      try {
        const decoded = jwt.verify(
          refreshToken,
          refreshTokenSecret
        ) as JwtPayload;
        console.log('breach detected!');

        const hackedUser = await User.findOneByUsernameOrId({
          username: decoded.username,
        });
        await User.updateById(hackedUser._id, {
          refreshToken: [],
        });
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          return res.status(403).json({ error: 'Token expired' });
        } else {
          return res.status(403).json({ error: 'Invalid token' });
        }
      }
      return res.status(403).json({ error: 'Breach Detected' });
    }

    const newRefreshTokenArray = user.refreshToken.filter(
      (rt) => rt.token !== refreshToken
    );

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, refreshTokenSecret) as JwtPayload;
    } catch (error) {
      await User.updateById(user._id, {
        refreshToken: [...newRefreshTokenArray],
      });
      if (error instanceof TokenExpiredError) {
        return res.status(403).json({ error: 'Token expired' });
      } else {
        return res.status(403).json({ error: 'Invalid token' });
      }
    }

    const accessToken = generateAccessToken({
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role,
    });

    const newRefreshToken = generateRefreshToken({
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role,
    });

    const updatedUser = await User.updateById(user._id, {
      refreshToken: [
        ...newRefreshTokenArray,
        { token: newRefreshToken, expiresAt: calculateExpiresAt() },
      ],
    });
    console.log(updatedUser);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.status(201).send();
  } catch (error) {
    next(error);
  }
};
