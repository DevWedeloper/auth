import { NextFunction, Request, Response } from 'express';
import {
  getEmail,
  requestEmailVerificationCode,
} from '../../use-case/types/auth.type';

export const makeRequestEmailVerificationCodeForLoggedInUserEndpoint = ({
  requestEmailVerificationCode,
  getEmail,
}: {
  requestEmailVerificationCode: requestEmailVerificationCode;
  getEmail: getEmail;
}) => {
  const requestEmailVerificationCodeForLoggedInUserEndpoint = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      const { email } = await getEmail(req.cookies.accessToken);
      await requestEmailVerificationCode(email);
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  };
  return requestEmailVerificationCodeForLoggedInUserEndpoint;
};
