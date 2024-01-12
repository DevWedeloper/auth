import { NextFunction, Request, Response } from 'express';
import * as User from '../models/userModel';

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(204).send();
    }

    const user = await User.findByToken({ refreshToken });
    if (!user) {
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
      return res.sendStatus(204);
    }

    const newRefreshTokenArray = user.refreshToken.filter(
      (rt) => rt !== refreshToken
    );
    await User.updateById(user._id, {
      refreshToken: [...newRefreshTokenArray],
    });

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
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
