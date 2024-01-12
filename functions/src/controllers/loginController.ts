import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import * as User from '../models/userModel';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/tokenGenerator';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const cookies = req.cookies;
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

    const accessToken = generateAccessToken({
      userId: user._id,
      username: user.username,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id,
      username: user.username,
      role: user.role,
    });

    let newRefreshTokenArray = !cookies.refreshToken
      ? user.refreshToken
      : user.refreshToken.filter((rt) => rt !== cookies.refreshToken);

    if (cookies.refreshToken) {
      const foundToken = await User.findByToken({
        refreshToken: cookies.refreshToken,
      });
      if (!foundToken) {
        newRefreshTokenArray = [];
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
    }

    await User.updateById(user._id, {
      refreshToken: [...newRefreshTokenArray, refreshToken],
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.status(201).send();
  } catch (error) {
    next(error);
  }
};
