import { NextFunction, Request, Response } from 'express';
import { getEmail } from '../../use-case/types/auth.type';

export const makeGetEmailEndpoint = ({ getEmail }: { getEmail: getEmail }) => {
  const getEmailEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      const { email } = await getEmail(req.cookies.accessToken);
      return res.status(200).json({ email });
    } catch (error) {
      next(error);
    }
  };
  return getEmailEndpoint;
};
