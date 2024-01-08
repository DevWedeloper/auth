import { Request, Response, NextFunction } from 'express';
import * as RefreshToken from '../models/refreshAccessTokenModel';

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { refreshToken } = req.body;

    await RefreshToken.deleteOneByToken(refreshToken);
    return res.status(200).json({ message: 'Logged out successfully.' });
  } catch (error) {
    next(error);
  }
};
