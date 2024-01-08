import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import * as RefreshToken from '../models/refreshAccessTokenModel';
import * as User from '../models/userModel';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenGenerator';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { username, password } = req.body;

    const user = await User.isExisting({ username });
    if (!user) {
      return res.status(401).json({
        error: 'Invalid username',
      });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        error: 'Invalid password',
      });
    }

    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;
    const expiresInDays = process.env.REFRESH_TOKEN_EXPIRATION!;
    const expiresAt = new Date(
      Date.now() + parseInt(expiresInDays) * 24 * 60 * 60 * 1000
    );

    let refreshTokenEntry = await RefreshToken.isUnique({
      userId: user._id.toString(),
    });
    if (!refreshTokenEntry) {
      const refreshToken = generateRefreshToken({
        userId: user._id,
        username: user.username,
        role: user.role,
      });

      refreshTokenEntry = await RefreshToken.create({
        userId: user._id.toString(),
        username: user.username,
        token: refreshToken,
        expiresAt: expiresAt,
      });
    }

    const refreshTokenData = jwt.decode(refreshTokenEntry.token) as JwtPayload;
    const currentTime = Math.floor(Date.now() / 1000);
    if (refreshTokenData.exp! < currentTime) {
      const newRefreshToken = jwt.sign(
        { userId: user._id, username: user.username, role: user.role },
        refreshTokenSecret,
        {
          expiresIn: `${expiresInDays}`,
        }
      );

      refreshTokenEntry = await RefreshToken.updateById(
        refreshTokenEntry._id.toString(),
        {
          token: newRefreshToken,
          expiresAt: expiresAt,
        }
      );
    }

    const accessToken = generateAccessToken({
      userId: user._id,
      username: user.username,
      role: user.role,
    });
    return res.status(201).json({
      userId: user._id,
      accessToken,
      refreshToken: refreshTokenEntry.token,
    });
  } catch (error) {
    next(error);
  }
};
