import { Request, Response, NextFunction } from 'express';
import * as RefreshToken from '../models/refreshAccessTokenModel';

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const refreshToken = req.cookies.refreshToken;
    
    await RefreshToken.deleteOneByToken(refreshToken);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
