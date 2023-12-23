import { Request, Response } from 'express';
import * as RefreshToken from '../models/refreshAccessTokenModel';

export const logout = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { userId } = req.body;
    
    await RefreshToken.deleteOneByUsernameOrUserIdOrId({
      userId,
    });
    return res.status(200).json({ message: 'Logged out successfully.' });
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ error: 'Failed to logout', message: error.message });
    }
  }
};