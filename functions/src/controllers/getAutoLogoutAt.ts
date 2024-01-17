import { NextFunction, Request, Response } from 'express';
import * as User from '../models/userModel';
import { clearRefreshAndAccessTokenCookies } from '../utils/authHelper';

export const getAutoLogoutAt = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: 'Missing token' });
    }

    const user = await User.findByToken({ refreshToken });
    if (!user) {
      return res.status(403).json({ error: 'User not found' });
    }

    const autoLogoutAtValue = user.refreshToken
      .filter((rt) => rt.token === refreshToken)
      .map((rt) => rt.autoLogoutAt);
    const currentDate = new Date();

    if (autoLogoutAtValue[0] < currentDate) {
      const newRefreshTokenArray = user.refreshToken.filter(
        (rt) => rt.token !== refreshToken
      );
      await User.updateById(user._id, {
        refreshToken: [...newRefreshTokenArray],
      });

      clearRefreshAndAccessTokenCookies(res);
      return res.status(401).json({ error: 'Session expired' });
    }

    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};
