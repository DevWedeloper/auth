import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;

export const getRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ error: 'Missing token' });
    }

    const decodedToken = jwt.verify(
      accessToken,
      accessTokenSecret
    ) as JwtPayload;
    const role = decodedToken.role;
    return res.status(200).json({ role });
  } catch (error) {
    next(error);
  }
};
