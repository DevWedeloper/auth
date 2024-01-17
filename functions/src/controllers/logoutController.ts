import { NextFunction, Request, Response } from 'express';
import * as User from '../models/userModel';
import { clearRefreshAndAccessTokenCookies } from '../utils/authHelper';

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
      clearRefreshAndAccessTokenCookies(res);
      return res.sendStatus(204);
    }

    const newRefreshTokenArray = user.refreshToken.filter(
      (rt) => rt.token !== refreshToken
    );
    await User.updateById(user._id, {
      refreshToken: [...newRefreshTokenArray],
    });

    clearRefreshAndAccessTokenCookies(res);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
