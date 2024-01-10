import { NextFunction, Request, Response } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({ error: 'Missing token' });
    }

    try {
      jwt.verify(accessToken, accessTokenSecret);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(401).json({ error: 'Token expired' });
      } else {
        return res.status(401).json({ error: 'Invalid token' });
      }
    }

    return res.status(200).send();
  } catch (error) {
    next(error);
  }
};
